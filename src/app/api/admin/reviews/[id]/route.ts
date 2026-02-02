import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const denied = requirePermission(session, "review", "update")
  if (denied) return denied

  const { id } = await params
  const { approved } = await request.json()

  const review = await prisma.review.update({ where: { id }, data: { approved } })

  await createLog({
    userId: session!.user!.id!,
    action: approved ? LogAction.APPROVE : LogAction.REJECT,
    resource: LogResource.REVIEW,
    resourceId: id,
    description: `Review ${approved ? "aprovada" : "rejeitada"}`,
    request,
  })

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
  const denied = requirePermission(session, "review", "delete")
  if (denied) return denied

  const { id } = await params
  const review = await prisma.review.delete({ where: { id } })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.DELETE,
    resource: LogResource.REVIEW,
    resourceId: id,
    description: "Review excluida",
    request: _request,
  })

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
