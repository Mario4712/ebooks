import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { EbookDetail } from "@/components/ebooks/EbookDetail"
import { EbookTabs } from "@/components/ebooks/EbookTabs"
import { RelatedEbooks } from "@/components/ebooks/RelatedEbooks"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ebook = await prisma.ebook.findUnique({
    where: { slug },
    select: { title: true, shortDescription: true, metaTitle: true, metaDescription: true },
  })

  if (!ebook) return { title: "E-book não encontrado" }

  return {
    title: ebook.metaTitle || ebook.title,
    description: ebook.metaDescription || ebook.shortDescription || `Compre ${ebook.title} na Livraria Digital`,
    openGraph: {
      title: ebook.metaTitle || ebook.title,
      description: ebook.metaDescription || ebook.shortDescription || undefined,
    },
  }
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params
  const ebook = await prisma.ebook.findUnique({
    where: { slug, status: "PUBLISHED" },
  })

  if (!ebook) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: ebook.title,
    author: { "@type": "Person", name: ebook.author },
    description: ebook.shortDescription || ebook.description,
    isbn: ebook.isbn,
    numberOfPages: ebook.pages,
    inLanguage: ebook.language,
    offers: {
      "@type": "Offer",
      price: ebook.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: ebook.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: ebook.avgRating,
      reviewCount: ebook.reviewCount,
    } : undefined,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EbookDetail ebook={ebook} />
      <EbookTabs ebook={ebook} />
      <RelatedEbooks currentId={ebook.id} category={ebook.category} />
    </div>
  )
}
