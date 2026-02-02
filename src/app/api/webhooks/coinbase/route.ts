import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { processSuccessfulPayment } from "@/lib/payment-actions"
import { verifyCoinbaseWebhook } from "@/lib/coinbase"

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("X-CC-Webhook-Signature") || ""

    if (process.env.COINBASE_COMMERCE_WEBHOOK_SECRET) {
      const isValid = verifyCoinbaseWebhook(rawBody, signature)
      if (!isValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const event = body.event

    if (!event?.data?.metadata?.orderId) {
      return NextResponse.json({ received: true })
    }

    const orderId = event.data.metadata.orderId

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order || order.status === "PAID") {
      return NextResponse.json({ received: true })
    }

    switch (event.type) {
      case "charge:confirmed":
      case "charge:resolved":
        await processSuccessfulPayment(orderId)
        break
      case "charge:failed":
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "CANCELLED" },
        })
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Coinbase webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
