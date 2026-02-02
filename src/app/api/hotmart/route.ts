import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const position = request.nextUrl.searchParams.get("position")

  const where: { active: boolean; position?: string } = { active: true }
  if (position) {
    where.position = position
  }

  const ads = await prisma.hotmartAd.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      targetUrl: true,
      position: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(ads)
}
