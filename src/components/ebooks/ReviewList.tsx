"use client"

import { useEffect, useState } from "react"
import { StarRating } from "@/components/shared/StarRating"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: string
  rating: number
  comment: string | null
  createdAt: string
  user: { name: string | null }
}

export function ReviewList({ ebookId }: { ebookId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/ebooks/${ebookId}/reviews`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .finally(() => setLoading(false))
  }, [ebookId])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return <p className="text-muted-foreground">Nenhuma avaliação ainda.</p>
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm font-medium">{review.user.name || "Anônimo"}</span>
            <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
          </div>
          {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
        </div>
      ))}
    </div>
  )
}
