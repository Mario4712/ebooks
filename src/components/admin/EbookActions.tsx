"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface EbookActionsProps {
  ebookId: string
}

export function EbookActions({ ebookId }: EbookActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este e-book? Esta acao e irreversivel.")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/ebooks/${ebookId}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("E-book excluido")
        router.refresh()
      } else {
        toast.error("Erro ao excluir e-book")
      }
    } catch {
      toast.error("Erro ao excluir e-book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
      title="Excluir"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4 text-destructive" />
      )}
    </Button>
  )
}
