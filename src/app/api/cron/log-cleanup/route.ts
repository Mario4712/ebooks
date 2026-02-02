import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const LOG_RETENTION_DAYS = parseInt(process.env.LOG_RETENTION_DAYS || "90")

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Aggregate yesterday's metrics
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())
    const endOfYesterday = new Date(startOfYesterday)
    endOfYesterday.setHours(23, 59, 59, 999)

    const [totalLogs, creates, updates, deletes, errors, uniqueUsersResult] = await Promise.all([
      prisma.activityLog.count({
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday } },
      }),
      prisma.activityLog.count({
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday }, action: "CREATE" },
      }),
      prisma.activityLog.count({
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday }, action: "UPDATE" },
      }),
      prisma.activityLog.count({
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday }, action: "DELETE" },
      }),
      prisma.activityLog.count({
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday }, errorMessage: { not: null } },
      }),
      prisma.activityLog.groupBy({
        by: ["userId"],
        where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday }, userId: { not: null } },
      }),
    ])

    await prisma.dailyMetrics.upsert({
      where: { date: startOfYesterday },
      create: {
        date: startOfYesterday,
        totalLogs,
        creates,
        updates,
        deletes,
        errors,
        uniqueUsers: uniqueUsersResult.length,
      },
      update: {
        totalLogs,
        creates,
        updates,
        deletes,
        errors,
        uniqueUsers: uniqueUsersResult.length,
      },
    })

    // Delete old logs
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - LOG_RETENTION_DAYS)

    const deleted = await prisma.activityLog.deleteMany({
      where: { createdAt: { lt: cutoff } },
    })

    return NextResponse.json({
      aggregated: { date: startOfYesterday.toISOString(), totalLogs },
      deleted: deleted.count,
    })
  } catch (error) {
    console.error("Log cleanup cron error:", error)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
