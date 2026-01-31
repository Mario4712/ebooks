"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/shared/StarRating"
import { toast } from "sonner"

interface ReviewFormProps {
  ebookId: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({ ebookId, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  if (!session) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Selecione uma avaliação")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/ebooks/${ebookId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || "Erro ao enviar avaliação")
        return
      }
      toast.success("Avaliação enviada! Será exibida após aprovação.")
      setRating(0)
      setComment("")
      onReviewSubmitted?.()
    } catch {
      toast.error("Erro ao enviar avaliação")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
      <h3 className="font-semibold">Deixe sua avaliação</h3>
      <div>
        <StarRating rating={rating} interactive onChange={setRating} size="lg" />
      </div>
      <Textarea
        placeholder="Compartilhe sua experiência (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  )
}
