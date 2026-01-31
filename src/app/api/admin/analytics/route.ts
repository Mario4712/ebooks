import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const [revenueByMonth, topEbooks, byCategory, byPayment] = await Promise.all([
    prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "paidAt") as month, SUM(total) as revenue, COUNT(*)::int as count
      FROM "Order" WHERE status = 'PAID' AND "paidAt" IS NOT NULL
      GROUP BY month ORDER BY month DESC LIMIT 12
    `,
    prisma.ebook.findMany({
      orderBy: { salesCount: "desc" },
      take: 10,
      select: { title: true, salesCount: true, price: true },
    }),
    prisma.ebook.groupBy({
      by: ["category"],
      _sum: { salesCount: true },
      _count: true,
    }),
    prisma.order.groupBy({
      by: ["paymentMethod"],
      where: { status: "PAID" },
      _sum: { total: true },
      _count: true,
    }),
  ])

  return NextResponse.json({ revenueByMonth, topEbooks, byCategory, byPayment })
}
