import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, BookOpen, Download } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { generateDownloadToken } from "@/lib/download-token"

export const metadata = { title: "Pedido Confirmado" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderSuccessPage({ params }: Props) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id, userId: session.user.id },
    include: { items: { include: { ebook: true } } },
  })

  if (!order) notFound()

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold">Pedido Confirmado!</h1>
        <p className="text-muted-foreground mt-2">
          Pedido #{order.id.slice(0, 8)} - {order.status === "PAID" ? "Pago" : "Processando"}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Seus E-books</h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium">{item.ebook.title}</p>
                <p className="text-sm text-muted-foreground">{item.ebook.author}</p>
              </div>
              {order.status === "PAID" && (
                <div className="flex gap-2">
                  {["pdf", "epub", "mobi"].map((format) => {
                    const token = generateDownloadToken({
                      userId: session.user.id,
                      ebookId: item.ebookId,
                      format,
                    })
                    return (
                      <a key={format} href={`/api/download/${token}`}>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          {format.toUpperCase()}
                        </Button>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-8">
        <Link href="/biblioteca">
          <Button>
            <BookOpen className="mr-2 h-4 w-4" /> Acessar Biblioteca
          </Button>
        </Link>
        <Link href="/ebooks">
          <Button variant="outline">Continuar Comprando</Button>
        </Link>
      </div>
    </div>
  )
}
