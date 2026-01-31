import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const reviews = await prisma.review.findMany({
    where: { ebookId: id, approved: true },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ reviews })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const { id } = await params
  const { rating, comment } = await request.json()

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Avaliação inválida" }, { status: 400 })
  }

  // Verify ownership
  const hasPurchased = await prisma.orderItem.findFirst({
    where: { ebookId: id, order: { userId: session.user.id, status: "PAID" } },
  })

  if (!hasPurchased) {
    return NextResponse.json({ error: "Você precisa comprar o e-book para avaliar" }, { status: 403 })
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      ebookId: id,
      rating,
      comment,
    },
  })

  return NextResponse.json(review, { status: 201 })
}
