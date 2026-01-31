import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { LibraryCard } from "@/components/cliente/LibraryCard"

export const dynamic = "force-dynamic"

export const metadata = { title: "Minha Biblioteca" }

export default async function LibraryPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id, status: "PAID" },
    include: { items: { include: { ebook: true } } },
  })

  const purchasedEbooks = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item.ebook,
      orderId: order.id,
    }))
  )

  const uniqueEbooks = purchasedEbooks.filter(
    (ebook, index, self) => index === self.findIndex((e) => e.id === ebook.id)
  )

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">Minha Biblioteca</h1>
      {uniqueEbooks.length === 0 ? (
        <p className="text-muted-foreground">Você ainda não possui e-books. Explore nossa loja!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {uniqueEbooks.map((ebook) => (
            <LibraryCard key={ebook.id} ebook={ebook} userId={session.user.id} />
          ))}
        </div>
      )}
    </div>
  )
}
