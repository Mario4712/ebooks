import { prisma } from "@/lib/prisma"
import { EbookCard } from "@/components/ebooks/EbookCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export async function FeaturedEbooks() {
  const ebooks = await prisma.ebook.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { salesCount: "desc" },
    take: 6,
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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold">Mais Vendidos</h2>
            <p className="text-muted-foreground mt-1">Os e-books favoritos dos nossos leitores</p>
          </div>
          <Link href="/ebooks?sort=bestseller">
            <Button variant="outline">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <EbookCard key={ebook.id} ebook={ebook} />
          ))}
        </div>
      </div>
    </section>
  )
}
