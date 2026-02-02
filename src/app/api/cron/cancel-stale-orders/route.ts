import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)

    const result = await prisma.order.updateMany({
      where: {
        status: "PROCESSING",
        updatedAt: { lte: twoHoursAgo },
      },
      data: { status: "CANCELLED" },
    })

    return NextResponse.json({ cancelled: result.count })
  } catch (error) {
    console.error("Cancel stale orders cron error:", error)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
