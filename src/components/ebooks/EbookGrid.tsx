import { EbookCard } from "./EbookCard"

export interface EbookGridItem {
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
  isPartner?: boolean
  partnerUrl?: string
}

interface EbookGridProps {
  ebooks: EbookGridItem[]
}

export function EbookGrid({ ebooks }: EbookGridProps) {
  if (ebooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum e-book encontrado.</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {ebooks.map((ebook) => (
        <EbookCard
          key={ebook.id}
          ebook={ebook}
          isPartner={ebook.isPartner}
          partnerUrl={ebook.partnerUrl}
        />
      ))}
    </div>
  )
}
