import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "ebook", "view")
  if (denied) return denied

  const ebooks = await prisma.ebook.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(ebooks)
}

export async function POST(request: Request) {
  const session = await auth()
  const denied = requirePermission(session, "ebook", "create")
  if (denied) return denied

  const data = await request.json()
  const ebook = await prisma.ebook.create({ data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.CREATE,
    resource: LogResource.EBOOK,
    resourceId: ebook.id,
    description: `Ebook criado: ${ebook.title}`,
    request,
  })

  return NextResponse.json(ebook, { status: 201 })
}
