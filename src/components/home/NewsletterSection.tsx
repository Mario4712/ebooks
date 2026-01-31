"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        toast.success("Inscrito com sucesso!")
        setEmail("")
      } else {
        toast.error("Erro ao se inscrever")
      }
    } catch {
      toast.error("Erro ao se inscrever")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <Mail className="h-10 w-10 text-primary mx-auto" />
          <h2 className="font-serif text-3xl font-bold">Fique por dentro</h2>
          <p className="text-muted-foreground">
            Receba novidades, lançamentos e cupons de desconto exclusivos.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "..." : "Inscrever"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
