import { NextResponse } from "next/server"
import { contactSchema } from "@/validations/contact"
import { resend } from "@/lib/resend"
import { z } from "zod"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    if (resend) {
      await resend.emails.send({
        from: `筆言葉 Fude kotoba <${process.env.EMAIL_FROM || "noreply@livrariadigital.com"}>`,
        to: process.env.CONTACT_EMAIL || "contato@livrariadigital.com",
        subject: `[Contato] ${data.subject}`,
        text: `Nome: ${data.name}\nE-mail: ${data.email}\n\nMensagem:\n${data.message}`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 })
  }
}
