import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "user", "view")
  if (denied) return denied

  const users = await prisma.user.findMany({
    where: { role: "USER" },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(users)
}
