import { Metadata } from "next"
import { BookOpen, Shield, Zap, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sobre Nós | Livraria Digital",
  description: "Conheça a Livraria Digital - sua plataforma de e-books com os melhores títulos em português.",
}

const values = [
  {
    icon: BookOpen,
    title: "Conhecimento Acessível",
    description: "Acreditamos que o conhecimento deve ser acessível a todos. Oferecemos e-books de qualidade a preços justos.",
  },
  {
    icon: Shield,
    title: "Segurança e Privacidade",
    description: "Seus dados e pagamentos são protegidos com as melhores práticas de segurança do mercado.",
  },
  {
    icon: Zap,
    title: "Entrega Instantânea",
    description: "Receba seus e-books imediatamente após a compra, em múltiplos formatos para qualquer dispositivo.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Fazemos parte de uma comunidade de leitores apaixonados por aprendizado contínuo.",
  },
]

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-6">Sobre a Livraria Digital</h1>

      <div className="prose prose-gray max-w-none mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed">
          A Livraria Digital nasceu com a missão de democratizar o acesso ao conhecimento de
          qualidade em língua portuguesa. Somos uma plataforma especializada em e-books que
          cobre as áreas mais relevantes para o desenvolvimento pessoal e profissional.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Nosso catálogo é cuidadosamente curado para oferecer títulos que realmente fazem
          diferença na vida dos nossos leitores. De programação a finanças pessoais, de
          marketing digital a inteligência artificial, cada e-book é selecionado por seu
          valor prático e relevância no mercado atual.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Trabalhamos com múltiplos formatos (PDF, EPUB e MOBI) para garantir que você
          possa ler em qualquer dispositivo, e todos os nossos PDFs são personalizados
          com marca d&apos;água para proteção dos autores.
        </p>
      </div>

      <h2 className="font-serif text-2xl font-bold mb-6">Nossos Valores</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {values.map((value) => (
          <Card key={value.title}>
            <CardContent className="p-6">
              <value.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">Tem alguma dúvida?</h2>
        <p className="text-muted-foreground mb-4">
          Entre em contato conosco. Estamos sempre prontos para ajudar.
        </p>
        <a
          href="/contato"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Fale Conosco
        </a>
      </div>
    </div>
  )
}
