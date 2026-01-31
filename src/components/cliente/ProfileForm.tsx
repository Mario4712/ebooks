"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface ProfileFormProps {
  user: {
    id: string
    name: string | null
    email: string
    phone: string | null
    cpf: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(user.name || "")
  const [phone, setPhone] = useState(user.phone || "")

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })
      if (res.ok) {
        toast.success("Perfil atualizado!")
        router.refresh()
      } else {
        toast.error("Erro ao atualizar perfil")
      }
    } catch {
      toast.error("Erro ao atualizar perfil")
    } finally {
      setLoading(false)
    }
  }

  async function handleExportData() {
    const res = await fetch("/api/user/data-export")
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "meus-dados.json"
      a.click()
      URL.revokeObjectURL(url)
      toast.success("Dados exportados!")
    }
  }

  async function handleDeleteAccount() {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) return
    const res = await fetch("/api/user/data-deletion", { method: "POST" })
    if (res.ok) {
      toast.success("Conta excluída")
      window.location.href = "/"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>LGPD - Seus Dados</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Em conformidade com a LGPD, você pode exportar ou excluir seus dados a qualquer momento.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleExportData}>Exportar Meus Dados</Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>Excluir Conta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
