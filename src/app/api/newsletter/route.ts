import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import { WelcomeEmail } from "@/emails/WelcomeEmail"

const schema = z.object({
  email: z.string().email("E-mail inválido"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = schema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email } })

    if (!existing) {
      await prisma.user.create({
        data: {
          email,
          name: "",
          newsletter: true,
        },
      })
    } else {
      await prisma.user.update({
        where: { email },
        data: { newsletter: true },
      })
    }

    if (resend) {
      await resend.emails.send({
        from: `Livraria Digital <${process.env.EMAIL_FROM || "noreply@livrariadigital.com"}>`,
        to: email,
        subject: "Bem-vindo à Livraria Digital!",
        react: WelcomeEmail({ name: existing?.name || "Leitor" }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Erro ao processar inscrição" }, { status: 500 })
  }
}
