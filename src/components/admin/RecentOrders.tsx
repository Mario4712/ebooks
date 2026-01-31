import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"

interface RecentOrdersProps {
  orders: {
    id: string
    status: string
    total: number
    createdAt: Date
    user: { name: string | null; email: string }
    items: { id: string }[]
  }[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
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
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{order.user.name}</p>
                    <p className="text-xs text-muted-foreground">{order.user.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
