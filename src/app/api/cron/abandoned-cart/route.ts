import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import { AbandonedCart } from "@/emails/AbandonedCart"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const abandonedOrders = await prisma.order.findMany({
      where: {
        status: "PENDING",
        createdAt: { lte: twentyFourHoursAgo },
        abandonedEmailSent: false,
      },
      include: {
        user: true,
        items: {
          include: { ebook: true },
        },
      },
      take: 50,
    })

    let sent = 0

    for (const order of abandonedOrders) {
      if (!order.user?.email || !resend) continue

      try {
        const items = order.items.map((item) => ({
          title: item.ebook.title,
          coverUrl: item.ebook.coverUrl,
          price: item.price,
        }))

        await resend.emails.send({
          from: `筆言葉 Fude kotoba <${process.env.EMAIL_FROM || "noreply@livrariadigital.com"}>`,
          to: order.user.email,
          subject: "Você esqueceu algo no carrinho!",
          react: AbandonedCart({
            name: order.user.name || "Leitor",
            items,
            total: order.total,
            couponCode: "BEMVINDO10",
          }),
        })

        await prisma.order.update({
          where: { id: order.id },
          data: { abandonedEmailSent: true },
        })

        sent++
      } catch (err) {
        console.error(`Failed to send abandoned cart email for order ${order.id}:`, err)
      }
    }

    return NextResponse.json({ processed: abandonedOrders.length, sent })
  } catch (error) {
    console.error("Abandoned cart cron error:", error)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
