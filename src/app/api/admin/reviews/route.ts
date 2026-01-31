import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true, email: true } },
      ebook: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(reviews)
}
