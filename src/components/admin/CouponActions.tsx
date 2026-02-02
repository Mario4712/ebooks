"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ToggleLeft, ToggleRight, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface CouponActionsProps {
  couponId: string
  active: boolean
}

export function CouponActions({ couponId, active }: CouponActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<"toggle" | "delete" | null>(null)

  async function handleToggle() {
    setLoading("toggle")
    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      })
      if (res.ok) {
        toast.success(active ? "Cupom desativado" : "Cupom ativado")
        router.refresh()
      } else {
        toast.error("Erro ao atualizar cupom")
      }
    } catch {
      toast.error("Erro ao atualizar cupom")
    } finally {
      setLoading(null)
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este cupom? Esta acao e irreversivel.")) return
    setLoading("delete")
    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Cupom excluido")
        router.refresh()
      } else {
        toast.error("Erro ao excluir cupom")
      }
    } catch {
      toast.error("Erro ao excluir cupom")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        disabled={loading !== null}
        title={active ? "Desativar" : "Ativar"}
      >
        {loading === "toggle" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : active ? (
          <ToggleRight className="h-4 w-4 text-green-600" />
        ) : (
          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={loading !== null}
        title="Excluir"
      >
        {loading === "delete" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4 text-destructive" />
        )}
      </Button>
    </div>
  )
}
