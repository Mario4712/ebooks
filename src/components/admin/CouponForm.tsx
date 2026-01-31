"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function CouponForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const [discountType, setDiscountType] = useState("PERCENTAGE")
  const [discountValue, setDiscountValue] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [maxUses, setMaxUses] = useState("")
  const [active, setActive] = useState(true)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase(),
          discountType,
          discountValue: parseFloat(discountValue),
          minPurchase: minPurchase ? parseFloat(minPurchase) : null,
          maxUses: maxUses ? parseInt(maxUses) : null,
          active,
        }),
      })
      if (res.ok) {
        toast.success("Cupom criado!")
        router.push("/admin/cupons")
      } else {
        toast.error("Erro ao criar cupom")
      }
    } catch {
      toast.error("Erro ao criar cupom")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Dados do Cupom</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código</Label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="CODIGO10" required />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Porcentagem</SelectItem>
                  <SelectItem value="FIXED">Valor Fixo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{discountType === "PERCENTAGE" ? "Desconto (%)" : "Desconto (R$)"}</Label>
              <Input type="number" step="0.01" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Compra Mínima (R$)</Label>
              <Input type="number" step="0.01" value={minPurchase} onChange={(e) => setMinPurchase(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Máximo de Usos</Label>
              <Input type="number" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={active} onCheckedChange={setActive} />
            <Label>Ativo</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Criando..." : "Criar Cupom"}</Button>
        </form>
      </CardContent>
    </Card>
  )
}
