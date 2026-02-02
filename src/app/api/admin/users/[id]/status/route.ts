import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "user", "update")
  if (denied) return denied

  const { id } = await params
  const { status, reason } = await request.json()

  const validStatuses = ["ACTIVE", "SUSPENDED", "BANNED"]
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status invalido" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    return NextResponse.json({ error: "Usuario nao encontrado" }, { status: 404 })
  }

  if (status !== "ACTIVE" && !reason) {
    return NextResponse.json({ error: "Motivo e obrigatorio para suspensao ou banimento" }, { status: 400 })
  }

  const previousStatus = user.status
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { status },
  })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.USER,
    resourceId: id,
    description: `Status alterado de ${previousStatus} para ${status}${reason ? `: ${reason}` : ""}`,
    changedFields: ["status"],
    metadata: {
      previousStatus,
      newStatus: status,
      reason: reason || null,
      targetEmail: user.email,
    },
    request,
  })

  return NextResponse.json(updatedUser)
}
