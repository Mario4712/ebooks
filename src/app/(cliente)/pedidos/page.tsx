import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata = { title: "Meus Pedidos" }

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "Pendente", variant: "outline" },
  PROCESSING: { label: "Processando", variant: "secondary" },
  PAID: { label: "Pago", variant: "default" },
  FAILED: { label: "Falhou", variant: "destructive" },
  REFUNDED: { label: "Reembolsado", variant: "outline" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
}

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { ebook: { select: { title: true } } } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">Meus Pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const status = statusMap[order.status] || { label: order.status, variant: "outline" as const }
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/pedidos/${order.id}`} className="text-primary hover:underline font-mono text-sm">
                      #{order.id.slice(0, 8)}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.items.map((i) => i.ebook.title).join(", ")}</TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell><Badge variant={status.variant}>{status.label}</Badge></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
