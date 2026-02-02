import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "hotmart", "view")
  if (denied) return denied
  const ads = await prisma.hotmartAd.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(ads)
}

export async function POST(request: Request) {
  const session = await auth()
  const denied = requirePermission(session, "hotmart", "create")
  if (denied) return denied
  const data = await request.json()
  const ad = await prisma.hotmartAd.create({ data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.CREATE,
    resource: LogResource.HOTMART_AD,
    resourceId: ad.id,
    description: `Anuncio criado: ${ad.title}`,
    request,
  })

  return NextResponse.json(ad, { status: 201 })
}
