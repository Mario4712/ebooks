import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users, BookOpen } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface DashboardStatsProps {
  revenue: number
  orders: number
  customers: number
  ebooks: number
}

export function DashboardStats({ revenue, orders, customers, ebooks }: DashboardStatsProps) {
  const stats = [
    { title: "Receita Total", value: formatPrice(revenue), icon: DollarSign, color: "text-green-600" },
    { title: "Pedidos", value: orders.toString(), icon: ShoppingCart, color: "text-blue-600" },
    { title: "Clientes", value: customers.toString(), icon: Users, color: "text-purple-600" },
    { title: "E-books", value: ebooks.toString(), icon: BookOpen, color: "text-amber-600" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
