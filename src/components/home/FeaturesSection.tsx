import { Download, FileText, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Download,
    title: "Download Imediato",
    description: "Receba seus e-books instantaneamente após a confirmação do pagamento.",
  },
  {
    icon: FileText,
    title: "3 Formatos",
    description: "Todos os e-books disponíveis em PDF, EPUB e MOBI para qualquer dispositivo.",
  },
  {
    icon: Shield,
    title: "Pagamento Seguro",
    description: "PIX, cartão de crédito e criptomoedas com total segurança.",
  },
  {
    icon: Clock,
    title: "Acesso Vitalício",
    description: "Compre uma vez e tenha acesso para sempre à sua biblioteca digital.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
