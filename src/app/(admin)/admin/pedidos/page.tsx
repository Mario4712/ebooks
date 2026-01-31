import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin - Pedidos" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Pedidos</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Link href={`/admin/pedidos/${order.id}`} className="text-primary hover:underline font-mono text-sm">
                  #{order.id.slice(0, 8)}
                </Link>
              </TableCell>
              <TableCell>{order.user.name || order.user.email}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{formatPrice(order.total)}</TableCell>
              <TableCell>{order.paymentMethod || "-"}</TableCell>
              <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
