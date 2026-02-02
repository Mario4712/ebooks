import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission } from "@/lib/permissions"

export async function GET(request: Request) {
  const session = await auth()
  const denied = requirePermission(session, "order", "view")
  if (denied) return denied

  const url = new URL(request.url)
  const status = url.searchParams.get("status")

  const orders = await prisma.order.findMany({
    where: status ? { status: status as any } : undefined,
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { ebook: { select: { title: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}
