import { Payment } from "mercadopago"
import { mercadopago } from "../mercadopago"

interface CreatePixPaymentParams {
  amount: number
  description: string
  orderId: string
  payerEmail: string
  payerCpf?: string
}

export async function createPixPayment({
  amount,
  description,
  orderId,
  payerEmail,
  payerCpf,
}: CreatePixPaymentParams) {
  const payment = new Payment(mercadopago)

  const result = await payment.create({
    body: {
      transaction_amount: amount,
      description,
      payment_method_id: "pix",
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
    qrCode: result.point_of_interaction?.transaction_data?.qr_code || "",
    qrCodeBase64: result.point_of_interaction?.transaction_data?.qr_code_base64 || "",
    expiresAt: result.date_of_expiration || "",
  }
}
