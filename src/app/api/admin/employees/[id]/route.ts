import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission, canManageRole } from "@/lib/permissions"
import { createLog, LogAction, LogResource } from "@/lib/audit"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "employee", "update")
  if (denied) return denied

  const { id } = await params
  const data = await request.json()

  const employee = await prisma.user.findUnique({ where: { id } })
  if (!employee || employee.role === "USER") {
    return NextResponse.json({ error: "Funcionario nao encontrado" }, { status: 404 })
  }

  if (!canManageRole(session!.user!.role as string, employee.role)) {
    return NextResponse.json({ error: "Voce nao pode editar um funcionario com cargo igual ou superior ao seu" }, { status: 403 })
  }

  if (data.role && !canManageRole(session!.user!.role as string, data.role)) {
    return NextResponse.json({ error: "Voce nao pode promover alguem para cargo igual ou superior ao seu" }, { status: 403 })
  }

  const updateData: Record<string, unknown> = {}
  if (data.name) updateData.name = data.name
  if (data.role) updateData.role = data.role
  if (data.employeeCode !== undefined) updateData.employeeCode = data.employeeCode || null
  if (data.hireDate) updateData.hireDate = new Date(data.hireDate)
  if (data.terminationDate !== undefined) {
    updateData.terminationDate = data.terminationDate ? new Date(data.terminationDate) : null
  }

  const updated = await prisma.user.update({ where: { id }, data: updateData })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.USER,
    resourceId: id,
    description: `Funcionario atualizado: ${updated.name}`,
    changedFields: Object.keys(updateData),
    request,
  })

  return NextResponse.json({ id: updated.id, name: updated.name, role: updated.role })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "employee", "delete")
  if (denied) return denied

  const { id } = await params

  if (id === session!.user!.id) {
    return NextResponse.json({ error: "Voce nao pode remover sua propria conta" }, { status: 400 })
  }

  const employee = await prisma.user.findUnique({ where: { id } })
  if (!employee || employee.role === "USER") {
    return NextResponse.json({ error: "Funcionario nao encontrado" }, { status: 404 })
  }

  if (!canManageRole(session!.user!.role as string, employee.role)) {
    return NextResponse.json({ error: "Voce nao pode remover um funcionario com cargo igual ou superior ao seu" }, { status: 403 })
  }

  // Demote to USER instead of deleting
  await prisma.user.update({
    where: { id },
    data: {
      role: "USER",
      terminationDate: new Date(),
      employeeCode: null,
      managerId: null,
    },
  })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.DELETE,
    resource: LogResource.USER,
    resourceId: id,
    description: `Funcionario removido: ${employee.name} (rebaixado para USER)`,
    request: _request,
  })

  return NextResponse.json({ success: true })
}
