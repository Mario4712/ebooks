"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserCog } from "lucide-react"
import { toast } from "sonner"

interface ClientStatusActionsProps {
  userId: string
  currentStatus: string
}

const statusLabels: Record<string, string> = {
  ACTIVE: "Ativo",
  SUSPENDED: "Suspenso",
  BANNED: "Banido",
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  SUSPENDED: "bg-yellow-100 text-yellow-800",
  BANNED: "bg-red-100 text-red-800",
}

export function ClientStatusActions({ userId, currentStatus }: ClientStatusActionsProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newStatus, setNewStatus] = useState(currentStatus)
  const [reason, setReason] = useState("")

  function handleOpen() {
    setNewStatus(currentStatus)
    setReason("")
    setOpen(true)
  }

  async function handleSubmit() {
    if (newStatus !== "ACTIVE" && !reason.trim()) {
      toast.error("Informe o motivo da alteracao")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, reason: reason.trim() || undefined }),
      })

      if (res.ok) {
        toast.success("Status atualizado")
        setOpen(false)
        router.refresh()
      } else {
        const data = await res.json()
        toast.error(data.error || "Erro ao atualizar status")
      }
    } catch {
      toast.error("Erro ao atualizar status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        <UserCog className="h-4 w-4 mr-2" /> Alterar Status
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Status do Cliente</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Status atual:</Label>
              <div className="mt-1">
                <Badge variant="secondary" className={statusColors[currentStatus] || ""}>
                  {statusLabels[currentStatus] || currentStatus}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Novo status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                  <SelectItem value="BANNED">Banido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newStatus !== "ACTIVE" && (
              <div className="space-y-2">
                <Label>Motivo *</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explique o motivo da alteracao..."
                  rows={3}
                />
              </div>
            )}

            {newStatus === "SUSPENDED" && (
              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                Cliente suspenso nao podera fazer login nem acessar seus e-books ate ser reativado.
              </div>
            )}

            {newStatus === "BANNED" && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                Cliente banido tera acesso permanentemente bloqueado. Esta acao e reversivel apenas por um administrador.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || newStatus === currentStatus}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
