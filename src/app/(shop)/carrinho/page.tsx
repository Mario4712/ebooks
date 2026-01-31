"use client"

import { useCartStore } from "@/stores/cart"
import { CartItem } from "@/components/cart/CartItem"
import { CouponInput } from "@/components/cart/CouponInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, clearCart, subtotal, discount, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold mb-2">Carrinho Vazio</h1>
        <p className="text-muted-foreground mb-6">Explore nossos e-books e encontre o conteúdo perfeito.</p>
        <Link href="/ebooks"><Button size="lg">Ver E-books</Button></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/ebooks"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <h1 className="font-serif text-3xl font-bold">Carrinho</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Button variant="outline" size="sm" onClick={clearCart} className="mt-4">Limpar carrinho</Button>
        </div>
        <Card>
          <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <CouponInput />
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              {discount() > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-{formatPrice(discount())}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">Finalizar Compra</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
