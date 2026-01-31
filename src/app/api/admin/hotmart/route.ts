import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const ads = await prisma.hotmartAd.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(ads)
}

export async function POST(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const data = await request.json()
  const ad = await prisma.hotmartAd.create({ data })
  return NextResponse.json(ad, { status: 201 })
}
