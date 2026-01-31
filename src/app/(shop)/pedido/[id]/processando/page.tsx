"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function OrderProcessingPage() {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/checkout/status/${params.id}`)
        const data = await res.json()
        if (data.status === "PAID") {
          clearInterval(interval)
          router.push(`/pedido/${params.id}/sucesso`)
        } else if (data.status === "FAILED") {
          clearInterval(interval)
          router.push(`/checkout`)
        }
      } catch {}
    }, 3000)

    return () => clearInterval(interval)
  }, [params.id, router])

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
          <h1 className="font-serif text-2xl font-bold">Processando Pagamento</h1>
          <p className="text-muted-foreground">
            Aguardando a confirmação do seu pagamento. Esta página será atualizada automaticamente.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
