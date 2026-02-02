import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import { requirePermission } from "@/lib/permissions"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "coupon", "view")
  if (denied) return denied
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(coupons)
}

export async function POST(request: Request) {
  const session = await auth()
  const denied = requirePermission(session, "coupon", "create")
  if (denied) return denied
  const data = await request.json()
  const coupon = await prisma.coupon.create({ data })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.CREATE,
    resource: LogResource.COUPON,
    resourceId: coupon.id,
    description: `Cupom criado: ${coupon.code}`,
    request,
  })

  return NextResponse.json(coupon, { status: 201 })
}
