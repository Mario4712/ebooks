import { CouponForm } from "@/components/admin/CouponForm"

export const metadata = { title: "Admin - Novo Cupom" }

export default function NewCouponPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Novo Cupom</h1>
      <CouponForm />
    </div>
  )
}
