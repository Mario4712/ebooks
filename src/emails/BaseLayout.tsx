import { Html, Head, Preview, Body, Container, Section, Text, Hr } from "@react-email/components"

interface BaseLayoutProps {
  preview: string
  children: React.ReactNode
}

export function BaseLayout({ preview, children }: BaseLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "Inter, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Text style={{ fontSize: "24px", fontWeight: "bold", color: "#1D3557", marginBottom: "24px" }}>
              筆言葉 Fude kotoba
            </Text>
            {children}
          </Section>
          <Section style={{ textAlign: "center" as const, padding: "16px" }}>
            <Hr />
            <Text style={{ fontSize: "12px", color: "#999" }}>
              &copy; {new Date().getFullYear()} 筆言葉 Fude kotoba. Todos os direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
