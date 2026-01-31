import { createCoinbaseCharge } from "../coinbase"

interface CreateCryptoPaymentParams {
  amount: number
  description: string
  orderId: string
}

export async function createCryptoPayment({
  amount,
  description,
  orderId,
}: CreateCryptoPaymentParams) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const result = await createCoinbaseCharge({
    name: description,
    description: `Pedido #${orderId}`,
    pricing_type: "fixed_price",
    local_price: {
      amount: amount.toFixed(2),
      currency: "BRL",
    },
    metadata: { orderId },
    redirect_url: `${appUrl}/pedido/${orderId}/sucesso`,
    cancel_url: `${appUrl}/pedido/${orderId}/processando`,
  })

  return {
    chargeId: result.data.id,
    chargeUrl: result.data.hosted_url,
  }
}
