import { Resend } from "resend"

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: React.ReactElement
}) {
  if (!resend) {
    console.log(`[Email] Would send to ${to}: ${subject}`)
    return
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@livrariadigital.com",
    to,
    subject,
    react,
  })
}
