import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const { name, phone } = await request.json()

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone },
  })

  return NextResponse.json({ success: true })
}
