import { Badge } from "@/components/ui/badge"
import { QrCode, CreditCard, Bitcoin, Gift, UserCheck } from "lucide-react"

const config: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  PIX: { label: "PIX", className: "bg-teal-100 text-teal-800 border-teal-200", icon: QrCode },
  CREDIT_CARD: { label: "Cartao", className: "bg-blue-100 text-blue-800 border-blue-200", icon: CreditCard },
  CRYPTO: { label: "Crypto", className: "bg-amber-100 text-amber-800 border-amber-200", icon: Bitcoin },
  FREE_COUPON: { label: "Gratis", className: "bg-green-100 text-green-800 border-green-200", icon: Gift },
  MANUAL: { label: "Manual", className: "bg-gray-100 text-gray-800 border-gray-200", icon: UserCheck },
}

export function PaymentMethodBadge({ method }: { method: string | null }) {
  if (!method) return <span className="text-muted-foreground text-sm">-</span>

  const c = config[method] || { label: method, className: "bg-gray-100 text-gray-800", icon: CreditCard }
  const Icon = c.icon

  return (
    <Badge variant="outline" className={`gap-1 ${c.className}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </Badge>
  )
}
