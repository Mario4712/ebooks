import { NextResponse } from "next/server"
import { Payment } from "mercadopago"
import { mercadopago } from "@/lib/mercadopago"
import { prisma } from "@/lib/prisma"
import { processSuccessfulPayment } from "@/lib/payment-actions"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.type !== "payment") {
      return NextResponse.json({ received: true })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 })
    }

    const payment = new Payment(mercadopago)
    const paymentData = await payment.get({ id: paymentId })

    const orderId = paymentData.external_reference
    if (!orderId) {
      return NextResponse.json({ error: "Missing order reference" }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order || order.status === "PAID") {
      return NextResponse.json({ received: true })
    }

    if (paymentData.status === "approved") {
      await processSuccessfulPayment(orderId)
    } else if (paymentData.status === "rejected") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("MercadoPago webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
