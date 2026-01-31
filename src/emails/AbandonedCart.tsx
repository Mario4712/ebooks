import { Text, Button, Section } from "@react-email/components"
import { BaseLayout } from "./BaseLayout"

interface CartItem {
  title: string
  coverUrl: string | null
  price: number
}

interface AbandonedCartProps {
  name: string
  items: CartItem[]
  total: number
  couponCode?: string
}

export function AbandonedCart({ name, items, total, couponCode }: AbandonedCartProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total)

  return (
    <BaseLayout preview="Você esqueceu algo no carrinho!">
      <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
        Esqueceu algo?
      </Text>
      <Text>
        Olá, {name}! Notamos que você deixou itens no seu carrinho. Que tal completar sua compra?
      </Text>
      <Section style={{ margin: "16px 0" }}>
        {items.map((item, i) => (
          <Text key={i} style={{ margin: "4px 0", fontSize: "14px" }}>
            &bull; {item.title} —{" "}
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price)}
          </Text>
        ))}
        <Text style={{ fontWeight: "bold", marginTop: "8px" }}>
          Total: {formattedTotal}
        </Text>
      </Section>
      {couponCode && (
        <Text style={{ backgroundColor: "#FEF3C7", padding: "12px", borderRadius: "6px", textAlign: "center" as const }}>
          Use o cupom <strong>{couponCode}</strong> e ganhe desconto!
        </Text>
      )}
      <Button
        href={`${appUrl}/carrinho`}
        style={{
          backgroundColor: "#1E3A8A",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Voltar ao Carrinho
      </Button>
    </BaseLayout>
  )
}
