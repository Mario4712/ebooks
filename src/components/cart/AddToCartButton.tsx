"use client"

import { ShoppingCart, Check } from "lucide-react"
import { useCartStore, type CartItem } from "@/stores/cart"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AddToCartButtonProps {
  item: CartItem
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AddToCartButton({ item, size = "default", className }: AddToCartButtonProps) {
  const { addItem, hasItem } = useCartStore()
  const inCart = hasItem(item.id)

  function handleAdd() {
    if (inCart) return
    addItem(item)
    toast.success("Adicionado ao carrinho", { description: item.title })
  }

  return (
    <Button onClick={handleAdd} size={size} className={className} variant={inCart ? "secondary" : "default"} disabled={inCart}>
      {inCart ? (
        <><Check className="mr-2 h-4 w-4" /> No Carrinho</>
      ) : (
        <><ShoppingCart className="mr-2 h-4 w-4" /> Adicionar</>
      )}
    </Button>
  )
}
