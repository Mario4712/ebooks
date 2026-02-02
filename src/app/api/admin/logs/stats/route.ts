import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "log", "view")
  if (denied) return denied

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(startOfToday)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const [totalToday, totalThisWeek, errorCount, actionCounts] = await Promise.all([
    prisma.activityLog.count({
      where: { createdAt: { gte: startOfToday } },
    }),
    prisma.activityLog.count({
      where: { createdAt: { gte: startOfWeek } },
    }),
    prisma.activityLog.count({
      where: { errorMessage: { not: null } },
    }),
    prisma.activityLog.groupBy({
      by: ["action"],
      _count: { action: true },
      orderBy: { _count: { action: "desc" } },
      take: 1,
    }),
  ])

  const topAction = actionCounts[0]
    ? { action: actionCounts[0].action, count: actionCounts[0]._count.action }
    : null

  return NextResponse.json({ totalToday, totalThisWeek, errorCount, topAction })
}
