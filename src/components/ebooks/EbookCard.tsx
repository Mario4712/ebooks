"use client"

import Link from "next/link"
import { FileText, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/shared/StarRating"
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { formatPrice } from "@/lib/utils"

interface EbookCardProps {
  ebook: {
    id: string
    title: string
    slug: string
    author: string
    price: number
    originalPrice?: number | null
    coverUrl?: string | null
    category: string
    avgRating: number
    reviewCount: number
    featured: boolean
  }
}

export function EbookCard({ ebook }: EbookCardProps) {
  const hasDiscount = ebook.originalPrice && ebook.originalPrice > ebook.price
  const discountPercent = hasDiscount
    ? Math.round(((ebook.originalPrice! - ebook.price) / ebook.originalPrice!) * 100)
    : 0

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/ebooks/${ebook.slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-primary/30 group-hover:scale-110 transition-transform" />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-red-500">-{discountPercent}%</Badge>
          )}
          {ebook.featured && (
            <Badge className="absolute top-2 left-2" variant="secondary">Destaque</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <FileText className="h-3 w-3" />
          <span>PDF / EPUB / MOBI</span>
        </div>
        <Link href={`/ebooks/${ebook.slug}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
            {ebook.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{ebook.author}</p>
        <div className="flex items-center gap-2">
          <StarRating rating={ebook.avgRating} size="sm" />
          <span className="text-xs text-muted-foreground">({ebook.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{formatPrice(ebook.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(ebook.originalPrice!)}
              </span>
            )}
          </div>
        </div>
        <AddToCartButton
          item={{
            id: ebook.id,
            title: ebook.title,
            slug: ebook.slug,
            author: ebook.author,
            price: ebook.price,
            originalPrice: ebook.originalPrice || undefined,
            coverUrl: ebook.coverUrl || null,
          }}
          size="sm"
          className="w-full"
        />
      </CardContent>
    </Card>
  )
}
