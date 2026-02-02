import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { requirePermission, canManageRole } from "@/lib/permissions"
import { createLog, LogAction, LogResource } from "@/lib/audit"
import bcrypt from "bcryptjs"

export async function GET() {
  const session = await auth()
  const denied = requirePermission(session, "employee", "view")
  if (denied) return denied

  const employees = await prisma.user.findMany({
    where: { role: { not: "USER" } },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      employeeCode: true,
      hireDate: true,
      terminationDate: true,
      level: true,
      managerId: true,
      manager: { select: { name: true } },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  const session = await auth()
  const denied = requirePermission(session, "employee", "create")
  if (denied) return denied

  const data = await request.json()
  const { name, email, password, role, employeeCode, hireDate } = data

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Campos obrigatorios: name, email, password, role" }, { status: 400 })
  }

  if (role === "USER") {
    return NextResponse.json({ error: "Use o cadastro normal para usuarios" }, { status: 400 })
  }

  if (!canManageRole(session!.user!.role as string, role)) {
    return NextResponse.json({ error: "Voce nao pode criar um usuario com cargo igual ou superior ao seu" }, { status: 403 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email ja cadastrado" }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const employee = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      employeeCode: employeeCode || null,
      hireDate: hireDate ? new Date(hireDate) : new Date(),
      managerId: session!.user!.id,
    },
  })

  await createLog({
    userId: session!.user!.id!,
    action: LogAction.CREATE,
    resource: LogResource.USER,
    resourceId: employee.id,
    description: `Funcionario criado: ${employee.name} (${role})`,
    request,
  })

  return NextResponse.json({ id: employee.id, name: employee.name, email: employee.email, role: employee.role }, { status: 201 })
}
