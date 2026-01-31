import { Text, Section } from "@react-email/components"
import { BaseLayout } from "./BaseLayout"

interface OrderConfirmationProps {
  customerName: string
  orderId: string
  total: string
  items: { title: string; price: string }[]
}

export function OrderConfirmation({ customerName, orderId, total, items }: OrderConfirmationProps) {
  return (
    <BaseLayout preview={`Pedido #${orderId.slice(0, 8)} confirmado!`}>
      <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
        Pedido confirmado!
      </Text>
      <Text>Olá, {customerName}! Seu pedido foi recebido com sucesso.</Text>
      <Section style={{ backgroundColor: "#f6f9fc", borderRadius: "6px", padding: "16px", margin: "16px 0" }}>
        <Text style={{ fontSize: "14px", fontWeight: "bold" }}>Pedido #{orderId.slice(0, 8)}</Text>
        {items.map((item, i) => (
          <Text key={i} style={{ fontSize: "14px", margin: "4px 0" }}>
            {item.title} - {item.price}
          </Text>
        ))}
        <Text style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px" }}>
          Total: {total}
        </Text>
      </Section>
      <Text style={{ fontSize: "14px", color: "#666" }}>
        Você receberá os links de download assim que o pagamento for confirmado.
      </Text>
    </BaseLayout>
  )
}
