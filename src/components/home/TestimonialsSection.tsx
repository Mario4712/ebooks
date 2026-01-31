import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/shared/StarRating"

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Desenvolvedor",
    comment: "Os e-books de programação são incríveis! Conteúdo atualizado e didático.",
    rating: 5,
  },
  {
    name: "Ana Beatriz",
    role: "Empreendedora",
    comment: "Transformou meu negócio digital. Investimento que valeu cada centavo.",
    rating: 5,
  },
  {
    name: "Pedro Santos",
    role: "Estudante",
    comment: "Preços acessíveis e entrega instantânea. Melhor livraria digital do Brasil.",
    rating: 4,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold">O que nossos leitores dizem</h2>
          <p className="text-muted-foreground mt-1">Milhares de profissionais já transformaram suas carreiras</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="p-6 space-y-4">
                <StarRating rating={t.rating} size="sm" />
                <p className="text-sm text-muted-foreground italic">&ldquo;{t.comment}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
