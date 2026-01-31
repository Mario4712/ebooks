import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { adId } = await request.json()
    if (!adId) return NextResponse.json({ error: "Missing adId" }, { status: 400 })

    await prisma.hotmartAd.update({
      where: { id: adId },
      data: { clickCount: { increment: 1 } },
    })

    await prisma.hotmartClick.create({
      data: {
        adId,
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "",
        referer: request.headers.get("referer") || "",
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 })
  }
}
