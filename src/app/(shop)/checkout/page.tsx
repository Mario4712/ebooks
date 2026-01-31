"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/stores/cart"
import { useRouter } from "next/navigation"
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps"
import { IdentificationStep } from "@/components/checkout/IdentificationStep"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items } = useCartStore()
  const router = useRouter()
  const [step, setStep] = useState(session ? 2 : 1)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-serif text-3xl font-bold mb-2">Carrinho Vazio</h1>
        <p className="text-muted-foreground mb-6">Adicione e-books ao carrinho para finalizar a compra.</p>
        <Link href="/ebooks"><Button size="lg">Ver E-books</Button></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutSteps currentStep={step} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <IdentificationStep onComplete={() => setStep(2)} />
          )}
          {step === 2 && (
            <PaymentStep
              onSuccess={(orderId) => router.push(`/pedido/${orderId}/sucesso`)}
              onProcessing={(orderId) => router.push(`/pedido/${orderId}/processando`)}
            />
          )}
        </div>
        <OrderSummary />
      </div>
    </div>
  )
}
