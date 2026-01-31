"use client"

import { useCartStore } from "@/stores/cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

export function OrderSummary() {
  const { items, subtotal, discount, total, couponCode } = useCartStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="truncate mr-2">{item.title}</span>
            <span className="flex-shrink-0">{formatPrice(item.price)}</span>
          </div>
        ))}
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal())}</span>
          </div>
          {discount() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto ({couponCode})</span>
              <span>-{formatPrice(discount())}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(total())}</span>
        </div>
      </CardContent>
    </Card>
  )
}
