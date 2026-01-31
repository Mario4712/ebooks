import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = { title: "Admin - Configurações" }

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold">Configurações</h1>
      <Card>
        <CardHeader><CardTitle>Configurações da Loja</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            As configurações da loja são gerenciadas através das variáveis de ambiente (.env).
            Altere as credenciais dos gateways de pagamento, serviços de email e armazenamento diretamente no arquivo .env.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
