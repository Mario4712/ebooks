import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@/generated/prisma/client"
import { requirePermission } from "@/lib/permissions"

export async function GET(request: NextRequest) {
  const session = await auth()
  const denied = requirePermission(session, "log", "export")
  if (denied) return denied

  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")
  const resource = searchParams.get("resource")
  const search = searchParams.get("search")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const hasError = searchParams.get("hasError")

  const where: Prisma.ActivityLogWhereInput = {}

  if (action) where.action = action as Prisma.ActivityLogWhereInput["action"]
  if (resource) where.resource = resource as Prisma.ActivityLogWhereInput["resource"]
  if (hasError === "true") where.errorMessage = { not: null }

  if (search) {
    where.OR = [
      { description: { contains: search, mode: "insensitive" } },
      { resourceId: { contains: search, mode: "insensitive" } },
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

  const logs = await prisma.activityLog.findMany({
    where,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 10000,
  })

  const BOM = "\uFEFF"
  const header = "Data,Usuario,Email,Acao,Recurso,ID Recurso,Descricao,IP,Metodo,Endpoint,Erro"
  const rows = logs.map((log) => {
    const date = new Date(log.createdAt).toISOString()
    const userName = csvEscape(log.user?.name || "")
    const userEmail = csvEscape(log.user?.email || "")
    const desc = csvEscape(log.description || "")
    const error = csvEscape(log.errorMessage || "")
    return `${date},${userName},${userEmail},${log.action},${log.resource},${log.resourceId || ""},${desc},${log.ip || ""},${log.method || ""},${log.endpoint || ""},${error}`
  })

  const csv = BOM + header + "\n" + rows.join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="logs-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
