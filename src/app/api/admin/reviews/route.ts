import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "review", "view")
  if (denied) return denied

  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true, email: true } },
      ebook: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(reviews)
}
