import { prisma } from "@/lib/prisma"
import { EbookCard } from "./EbookCard"

interface RelatedEbooksProps {
  currentId: string
  category: string
}

export async function RelatedEbooks({ currentId, category }: RelatedEbooksProps) {
  const ebooks = await prisma.ebook.findMany({
    where: {
      status: "PUBLISHED",
      category,
      id: { not: currentId },
    },
    take: 4,
    orderBy: { salesCount: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      price: true,
      originalPrice: true,
      coverUrl: true,
      category: true,
      avgRating: true,
      reviewCount: true,
      featured: true,
    },
  })

  if (ebooks.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-bold mb-6">Quem comprou também levou</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ebooks.map((ebook) => (
          <EbookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </section>
  )
}
