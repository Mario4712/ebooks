import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/cliente/ProfileForm"

export const dynamic = "force-dynamic"

export const metadata = { title: "Configurações" }

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, phone: true, cpf: true, image: true },
  })

  if (!user) redirect("/login")

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">Configurações</h1>
      <ProfileForm user={user} />
    </div>
  )
}
