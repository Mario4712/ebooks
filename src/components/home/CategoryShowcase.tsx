import Link from "next/link"
import { Code, TrendingUp, Briefcase, DollarSign, Zap, Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Programação", icon: Code, color: "text-blue-600 bg-blue-50" },
  { name: "Marketing Digital", icon: TrendingUp, color: "text-green-600 bg-green-50" },
  { name: "Empreendedorismo", icon: Briefcase, color: "text-purple-600 bg-purple-50" },
  { name: "Finanças Pessoais", icon: DollarSign, color: "text-amber-600 bg-amber-50" },
  { name: "Produtividade", icon: Zap, color: "text-orange-600 bg-orange-50" },
  { name: "Inteligência Artificial", icon: Brain, color: "text-cyan-600 bg-cyan-50" },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold">Explore por Categoria</h2>
          <p className="text-muted-foreground mt-1">Encontre o e-book perfeito para seu objetivo</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/ebooks?category=${encodeURIComponent(cat.name)}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className={`p-3 rounded-lg ${cat.color}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-center">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
