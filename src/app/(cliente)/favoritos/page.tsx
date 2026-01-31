import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { EbookCard } from "@/components/ebooks/EbookCard"

export const dynamic = "force-dynamic"

export const metadata = { title: "Meus Favoritos" }

export default async function FavoritesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      ebook: {
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
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="text-muted-foreground">Você ainda não favoritou nenhum e-book.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <EbookCard key={fav.id} ebook={fav.ebook} />
          ))}
        </div>
      )}
    </div>
  )
}
