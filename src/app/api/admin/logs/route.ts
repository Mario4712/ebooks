import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@/generated/prisma/client"
import { requirePermission } from "@/lib/permissions"

export async function GET(request: NextRequest) {
  const session = await auth()
  const denied = requirePermission(session, "log", "view")
  if (denied) return denied

  const searchParams = request.nextUrl.searchParams
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "25")))
  const action = searchParams.get("action")
  const resource = searchParams.get("resource")
  const userId = searchParams.get("userId")
  const search = searchParams.get("search")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const hasError = searchParams.get("hasError")

  const where: Prisma.ActivityLogWhereInput = {}

  if (action) where.action = action as Prisma.ActivityLogWhereInput["action"]
  if (resource) where.resource = resource as Prisma.ActivityLogWhereInput["resource"]
  if (userId) where.userId = userId
  if (hasError === "true") where.errorMessage = { not: null }

  if (search) {
    where.OR = [
      { description: { contains: search, mode: "insensitive" } },
      { resourceId: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
    ]
  }

  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = new Date(startDate)
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      where.createdAt.lte = end
    }
  }

  const [logs, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.activityLog.count({ where }),
  ])

  return NextResponse.json({
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}
