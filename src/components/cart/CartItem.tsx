"use client"

import { X } from "lucide-react"
import { useCartStore, type CartItem as CartItemType } from "@/stores/cart"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="relative w-12 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
          PDF
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.title}</h4>
        <p className="text-xs text-muted-foreground">{item.author}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeItem(item.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
