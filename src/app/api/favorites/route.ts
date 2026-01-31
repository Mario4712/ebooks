import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { ebookId: true },
  })

  return NextResponse.json(favorites.map((f) => f.ebookId))
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const { ebookId } = await request.json()

  const favorite = await prisma.favorite.create({
    data: { userId: session.user.id, ebookId },
  })

  return NextResponse.json(favorite, { status: 201 })
}
