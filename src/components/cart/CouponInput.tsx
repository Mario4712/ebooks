"use client"

import { useState } from "react"
import { useCartStore } from "@/stores/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tag, X } from "lucide-react"

export function CouponInput() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { couponCode, applyCoupon, removeCoupon } = useCartStore()

  async function handleApply() {
    if (!code.trim()) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/checkout/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Cupom inválido")
        return
      }
      applyCoupon(data.code, data.discountValue, data.discountType)
      setCode("")
    } catch {
      setError("Erro ao validar cupom")
    } finally {
      setLoading(false)
    }
  }

  if (couponCode) {
    return (
      <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/20 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">{couponCode}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeCoupon}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <Input placeholder="Código do cupom" value={code} onChange={(e) => setCode(e.target.value)} className="h-9" />
        <Button variant="outline" size="sm" onClick={handleApply} disabled={loading}>
          {loading ? "..." : "Aplicar"}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
