import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 lg:py-32">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Sua biblioteca digital
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Conhecimento que transforma sua{" "}
            <span className="text-primary">carreira</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra os melhores e-books de programacao, marketing digital, empreendedorismo e mais.
            Entrega instantanea em PDF, EPUB e MOBI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ebooks">
              <Button size="lg" className="w-full sm:w-auto cta-gradient border-0 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                Explorar E-books <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sobre">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
