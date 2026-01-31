import { Text, Button } from "@react-email/components"
import { BaseLayout } from "./BaseLayout"

export interface WelcomeEmailProps {
  name: string
  appUrl?: string
}

export function WelcomeEmail({ name, appUrl }: WelcomeEmailProps) {
  appUrl = appUrl || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  return (
    <BaseLayout preview="Bem-vindo à Livraria Digital!">
      <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
        Olá, {name}!
      </Text>
      <Text>
        Seja bem-vindo à Livraria Digital! Estamos felizes em ter você conosco.
      </Text>
      <Text>
        Explore nossa coleção de e-books de qualidade em diversas categorias como programação, marketing digital, empreendedorismo e muito mais.
      </Text>
      <Button
        href={`${appUrl}/ebooks`}
        style={{
          backgroundColor: "#1E3A8A",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Explorar E-books
      </Button>
    </BaseLayout>
  )
}
