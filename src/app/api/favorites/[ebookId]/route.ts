import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ ebookId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const { ebookId } = await params

  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, ebookId },
  })

  return NextResponse.json({ success: true })
}
