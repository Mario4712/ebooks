import { Text, Button, Section } from "@react-email/components"
import { BaseLayout } from "./BaseLayout"

interface DeliveryEmailProps {
  customerName: string
  orderId: string
  items: {
    title: string
    formats: { format: string; token: string }[]
  }[]
  appUrl: string
}

export function DeliveryEmail({ customerName, orderId, items, appUrl }: DeliveryEmailProps) {
  return (
    <BaseLayout preview="Seus e-books estão prontos para download!">
      <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
        Seus e-books estão prontos!
      </Text>
      <Text>
        Olá, {customerName}! Os e-books do pedido #{orderId.slice(0, 8)} já estão disponíveis para download.
      </Text>

      {items.map((item, i) => (
        <Section key={i} style={{ backgroundColor: "#f6f9fc", borderRadius: "6px", padding: "16px", margin: "12px 0" }}>
          <Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
            {item.title}
          </Text>
          {item.formats.map((format) => (
            <Button
              key={format.format}
              href={`${appUrl}/api/download/${format.token}`}
              style={{
                backgroundColor: "#1E3A8A",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-block",
                marginRight: "8px",
                marginBottom: "4px",
                fontSize: "12px",
              }}
            >
              {format.format.toUpperCase()}
            </Button>
          ))}
        </Section>
      ))}

      <Text style={{ fontSize: "14px", color: "#666" }}>
        Os links de download são válidos por 48 horas. Você também pode acessar seus e-books a qualquer momento na sua biblioteca.
      </Text>

      <Button
        href={`${appUrl}/biblioteca`}
        style={{
          backgroundColor: "#F59E0B",
          color: "#000000",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "16px",
        }}
      >
        Acessar Biblioteca
      </Button>
    </BaseLayout>
  )
}
