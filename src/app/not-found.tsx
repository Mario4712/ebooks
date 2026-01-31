import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <BookX className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
      <h1 className="font-serif text-4xl font-bold mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link href="/">Voltar ao Início</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ebooks">Ver E-books</Link>
        </Button>
      </div>
    </div>
  )
}
