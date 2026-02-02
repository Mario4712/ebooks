import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "order", "view")
  if (denied) return denied

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { ebook: true } },
      coupon: true,
    },
  })
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(order)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "order", "update")
  if (denied) return denied

  const { id } = await params
  const { status } = await request.json()
  const order = await prisma.order.update({ where: { id }, data: { status } })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.ORDER,
    resourceId: id,
    description: `Pedido atualizado para: ${status}`,
    changedFields: ["status"],
    request,
  })

  return NextResponse.json(order)
}
