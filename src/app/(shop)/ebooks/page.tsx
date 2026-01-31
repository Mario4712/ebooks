import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { EbookGrid } from "@/components/ebooks/EbookGrid"
import { CatalogFilters } from "@/components/ebooks/CatalogFilters"
import { SearchBar } from "@/components/ebooks/SearchBar"
import type { Prisma } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "E-books",
  description: "Explore nossa coleção completa de e-books digitais em PDF, EPUB e MOBI.",
}

interface Props {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    sort?: string
    page?: string
  }>
}

export default async function EbooksPage({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const perPage = 12

  const where: Prisma.EbookWhereInput = {
    status: "PUBLISHED",
  }

  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { author: { contains: params.q, mode: "insensitive" } },
      { description: { contains: params.q, mode: "insensitive" } },
    ]
  }

  if (params.category) {
    where.category = params.category
  }

  if (params.price) {
    switch (params.price) {
      case "0-29":
        where.price = { lte: 29.9 }
        break
      case "30-59":
        where.price = { gte: 30, lte: 59.9 }
        break
      case "60-99":
        where.price = { gte: 60, lte: 99.9 }
        break
      case "100+":
        where.price = { gte: 100 }
        break
    }
  }

  let orderBy: Prisma.EbookOrderByWithRelationInput = { createdAt: "desc" }
  switch (params.sort) {
    case "price-asc":
      orderBy = { price: "asc" }
      break
    case "price-desc":
      orderBy = { price: "desc" }
      break
    case "rating":
      orderBy = { avgRating: "desc" }
      break
    case "bestseller":
      orderBy = { salesCount: "desc" }
      break
  }

  const [ebooks, total] = await Promise.all([
    prisma.ebook.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
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
    }),
    prisma.ebook.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">E-books</h1>
        <p className="text-muted-foreground">
          {total} {total === 1 ? "e-book encontrado" : "e-books encontrados"}
        </p>
      </div>

      <div className="space-y-6">
        <Suspense>
          <SearchBar />
        </Suspense>
        <Suspense>
          <CatalogFilters />
        </Suspense>
        <EbookGrid ebooks={ebooks} />

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <a
                key={i}
                href={`/ebooks?${new URLSearchParams({ ...params, page: String(i + 1) }).toString()}`}
                className={`px-3 py-1 rounded text-sm ${
                  page === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
