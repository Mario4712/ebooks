import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { id } = await params
  const { approved } = await request.json()

  const review = await prisma.review.update({ where: { id }, data: { approved } })

  // Recalculate ebook average rating
  const stats = await prisma.review.aggregate({
    where: { ebookId: review.ebookId, approved: true },
    _avg: { rating: true },
    _count: true,
  })

  await prisma.ebook.update({
    where: { id: review.ebookId },
    data: {
      avgRating: stats._avg.rating || 0,
      reviewCount: stats._count,
    },
  })

  return NextResponse.json(review)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { id } = await params
  const review = await prisma.review.delete({ where: { id } })

  // Recalculate
  const stats = await prisma.review.aggregate({
    where: { ebookId: review.ebookId, approved: true },
    _avg: { rating: true },
    _count: true,
  })

  await prisma.ebook.update({
    where: { id: review.ebookId },
    data: { avgRating: stats._avg.rating || 0, reviewCount: stats._count },
  })

  return NextResponse.json({ success: true })
}
