"use client"

import { useState } from "react"
import { useCartStore } from "@/stores/cart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { PixPayment } from "./PixPayment"

interface PaymentStepProps {
  onSuccess: (orderId: string) => void
  onProcessing: (orderId: string) => void
}

export function PaymentStep({ onSuccess, onProcessing }: PaymentStepProps) {
  const { items, couponCode, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [pixData, setPixData] = useState<{ orderId: string; qrCode: string; qrCodeBase64: string } | null>(null)

  async function handlePayment(method: "PIX" | "CREDIT_CARD" | "CRYPTO") {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ ebookId: i.id, price: i.price })),
          paymentMethod: method,
          couponCode: couponCode || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Erro no pagamento")
        return
      }

      switch (method) {
        case "PIX":
          setPixData({
            orderId: data.orderId,
            qrCode: data.qrCode,
            qrCodeBase64: data.qrCodeBase64,
          })
          break
        case "CREDIT_CARD":
          if (data.status === "approved") {
            clearCart()
            onSuccess(data.orderId)
          } else {
            onProcessing(data.orderId)
          }
          break
        case "CRYPTO":
          if (data.chargeUrl) {
            window.location.href = data.chargeUrl
          }
          break
      }
    } catch {
      toast.error("Erro ao processar pagamento")
    } finally {
      setLoading(false)
    }
  }

  if (pixData) {
    return (
      <PixPayment
        orderId={pixData.orderId}
        qrCode={pixData.qrCode}
        qrCodeBase64={pixData.qrCodeBase64}
        onPaid={() => {
          clearCart()
          onSuccess(pixData.orderId)
        }}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forma de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pix">
          <TabsList className="w-full">
            <TabsTrigger value="pix" className="flex-1">PIX</TabsTrigger>
            <TabsTrigger value="card" className="flex-1">Cartão</TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value="pix" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Pague instantaneamente via PIX. O QR code será gerado após confirmar.
            </p>
            <Button onClick={() => handlePayment("PIX")} disabled={loading} className="w-full">
              {loading ? "Gerando PIX..." : "Pagar com PIX"}
            </Button>
          </TabsContent>

          <TabsContent value="card" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Pagamento com cartão de crédito processado pelo Mercado Pago. Parcelamento disponível.
            </p>
            <Button onClick={() => handlePayment("CREDIT_CARD")} disabled={loading} className="w-full">
              {loading ? "Processando..." : "Pagar com Cartão"}
            </Button>
          </TabsContent>

          <TabsContent value="crypto" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Pague com Bitcoin, Ethereum ou outras criptomoedas via Coinbase Commerce.
            </p>
            <Button onClick={() => handlePayment("CRYPTO")} disabled={loading} className="w-full">
              {loading ? "Redirecionando..." : "Pagar com Crypto"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
