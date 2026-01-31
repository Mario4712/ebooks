import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin - Clientes" }

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Clientes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Pedidos</TableHead>
            <TableHead>Cadastro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name || "-"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.cpf || "-"}</TableCell>
              <TableCell>{user._count.orders}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
