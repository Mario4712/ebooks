import { Text, Button } from "@react-email/components"
import { BaseLayout } from "./BaseLayout"

interface PasswordResetProps {
  name: string
  resetUrl: string
}

export function PasswordReset({ name, resetUrl }: PasswordResetProps) {
  return (
    <BaseLayout preview="Redefinir sua senha">
      <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
        Redefinir Senha
      </Text>
      <Text>Olá, {name}! Recebemos uma solicitação para redefinir sua senha.</Text>
      <Button
        href={resetUrl}
        style={{
          backgroundColor: "#1E3A8A",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Redefinir Senha
      </Button>
      <Text style={{ fontSize: "14px", color: "#666" }}>
        Se você não solicitou esta alteração, ignore este email. O link expira em 1 hora.
      </Text>
    </BaseLayout>
  )
}
