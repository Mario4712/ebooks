import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const ebooks = await prisma.ebook.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(ebooks)
}

export async function POST(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const data = await request.json()
  const ebook = await prisma.ebook.create({ data })
  return NextResponse.json(ebook, { status: 201 })
}
