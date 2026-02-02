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
  const denied = requirePermission(session, "ebook", "view")
  if (denied) return denied

  const { id } = await params
  const ebook = await prisma.ebook.findUnique({ where: { id } })
  if (!ebook) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(ebook)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "ebook", "update")
  if (denied) return denied

  const { id } = await params
  const data = await request.json()
  const ebook = await prisma.ebook.update({ where: { id }, data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.EBOOK,
    resourceId: id,
    description: `Ebook atualizado: ${ebook.title}`,
    changedFields: Object.keys(data),
    request,
  })

  return NextResponse.json(ebook)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const denied = requirePermission(session, "ebook", "delete")
  if (denied) return denied

  const { id } = await params
  await prisma.ebook.delete({ where: { id } })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.DELETE,
    resource: LogResource.EBOOK,
    resourceId: id,
    description: "Ebook excluido",
    request: _request,
  })

  return NextResponse.json({ success: true })
}
