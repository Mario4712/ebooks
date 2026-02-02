import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const denied = requirePermission(session, "hotmart", "update")
  if (denied) return denied
  const { id } = await params
  const data = await request.json()
  const ad = await prisma.hotmartAd.update({ where: { id }, data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.UPDATE,
    resource: LogResource.HOTMART_AD,
    resourceId: id,
    description: `Anuncio atualizado: ${ad.title}`,
    changedFields: Object.keys(data),
    request,
  })

  return NextResponse.json(ad)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const denied = requirePermission(session, "hotmart", "delete")
  if (denied) return denied
  const { id } = await params
  await prisma.hotmartAd.delete({ where: { id } })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.DELETE,
    resource: LogResource.HOTMART_AD,
    resourceId: id,
    description: "Anuncio excluido",
    request: _request,
  })

  return NextResponse.json({ success: true })
}
