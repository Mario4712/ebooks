import { EbookForm } from "@/components/admin/EbookForm"

export const metadata = { title: "Admin - Novo E-book" }

export default function NewEbookPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Novo E-book</h1>
      <EbookForm />
    </div>
  )
}
