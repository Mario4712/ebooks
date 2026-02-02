import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const denied = requirePermission(session, "coupon", "update")
  if (denied) return denied
  const { id } = await params
  const data = await request.json()
  const coupon = await prisma.coupon.update({ where: { id }, data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.COUPON,
    resourceId: id,
    description: `Cupom atualizado: ${coupon.code}`,
    changedFields: Object.keys(data),
    request,
  })

  return NextResponse.json(coupon)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const denied = requirePermission(session, "coupon", "delete")
  if (denied) return denied
  const { id } = await params
  await prisma.coupon.delete({ where: { id } })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.DELETE,
    resource: LogResource.COUPON,
    resourceId: id,
    description: "Cupom excluido",
    request: _request,
  })

  return NextResponse.json({ success: true })
}
