import { Payment } from "mercadopago"
import { mercadopago } from "../mercadopago"

interface CreateCardPaymentParams {
  amount: number
  description: string
  orderId: string
  token: string
  installments: number
  payerEmail: string
  payerCpf?: string
}

export async function createCardPayment({
  amount,
  description,
  orderId,
  token,
  installments,
  payerEmail,
  payerCpf,
}: CreateCardPaymentParams) {
  const payment = new Payment(mercadopago)

  const result = await payment.create({
    body: {
      transaction_amount: amount,
      description,
      token,
      installments,
      payment_method_id: "visa",
      payer: {
        email: payerEmail,
        ...(payerCpf ? { identification: { type: "CPF", number: payerCpf.replace(/\D/g, "") } } : {}),
      },
      external_reference: orderId,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
    },
  })

  return {
    paymentId: String(result.id),
    status: result.status,
    statusDetail: result.status_detail,
  }
}
