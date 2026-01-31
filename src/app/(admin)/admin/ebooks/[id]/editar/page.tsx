import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EbookForm } from "@/components/admin/EbookForm"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin - Editar E-book" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditEbookPage({ params }: Props) {
  const { id } = await params
  const ebook = await prisma.ebook.findUnique({ where: { id } })
  if (!ebook) notFound()

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Editar E-book</h1>
      <EbookForm ebook={ebook} />
    </div>
  )
}
