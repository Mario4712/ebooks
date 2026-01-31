"use client"

import { ShoppingCart, Trash2 } from "lucide-react"
import { useCartStore } from "@/stores/cart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { CartItem } from "./CartItem"
import { CouponInput } from "./CouponInput"
import Link from "next/link"

interface CartDrawerProps {
  onClose: () => void
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, clearCart, subtotal, discount, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <p className="text-lg font-medium">Seu carrinho está vazio</p>
        <p className="text-sm text-muted-foreground text-center">
          Explore nossos e-books e encontre o conteúdo perfeito para você.
        </p>
        <Link href="/ebooks" onClick={onClose}>
          <Button>Ver E-books</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-serif text-lg font-semibold">Carrinho ({items.length})</h2>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          <Trash2 className="h-4 w-4 mr-1" /> Limpar
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="border-t p-4 space-y-3">
        <CouponInput />
        <Separator />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal())}</span>
          </div>
          {discount() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto</span>
              <span>-{formatPrice(discount())}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold pt-2">
            <span>Total</span>
            <span>{formatPrice(total())}</span>
          </div>
        </div>
        <Link href="/checkout" onClick={onClose}>
          <Button className="w-full" size="lg">Finalizar Compra</Button>
        </Link>
      </div>
    </div>
  )
}
