import { prisma } from "./prisma"
import { generateDownloadToken } from "./download-token"
import { sendEmail } from "./resend"

export async function processSuccessfulPayment(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { ebook: true } },
      user: true,
      coupon: true,
    },
  })

  if (!order || order.status === "PAID") return

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "PAID", paidAt: new Date() },
  })

  // Increment sales counts
  for (const item of order.items) {
    await prisma.ebook.update({
      where: { id: item.ebookId },
      data: { salesCount: { increment: 1 } },
    })
  }

  // Record coupon usage
  if (order.couponId) {
    await prisma.coupon.update({
      where: { id: order.couponId },
      data: { usedCount: { increment: 1 } },
    })

    await prisma.couponUsage.create({
      data: {
        couponId: order.couponId,
        userId: order.userId,
        orderId: order.id,
      },
    }).catch(() => {})
  }

  // Generate download tokens
  const downloadLinks = order.items.map((item) => ({
    title: item.ebook.title,
    formats: ["pdf", "epub", "mobi"].map((format) => ({
      format,
      token: generateDownloadToken({
        userId: order.userId,
        ebookId: item.ebookId,
        format,
      }),
    })),
  }))

  // Send delivery email
  const recipientEmail = order.customerEmail || order.user.email
  if (recipientEmail) {
    try {
      const { DeliveryEmail } = await import("@/emails/DeliveryEmail")
      await sendEmail({
        to: recipientEmail,
        subject: `Seus e-books estão prontos! Pedido #${order.id.slice(0, 8)}`,
        react: DeliveryEmail({
          customerName: order.customerName || order.user.name || "Leitor",
          orderId: order.id,
          items: downloadLinks,
          appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        }),
      })
    } catch (error) {
      console.error("Failed to send delivery email:", error)
    }
  }

  return { order, downloadLinks }
}
