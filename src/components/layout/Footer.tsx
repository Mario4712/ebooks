import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">Livraria Digital</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua livraria digital com os melhores e-books para transformar sua carreira e vida.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ebooks" className="text-muted-foreground hover:text-primary transition-colors">E-books</Link></li>
              <li><Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Conta</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="/cadastro" className="text-muted-foreground hover:text-primary transition-colors">Cadastro</Link></li>
              <li><Link href="/biblioteca" className="text-muted-foreground hover:text-primary transition-colors">Biblioteca</Link></li>
              <li><Link href="/pedidos" className="text-muted-foreground hover:text-primary transition-colors">Pedidos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Livraria Digital. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Pagamentos seguros com</span>
            <span className="font-medium">Mercado Pago</span>
            <span className="font-medium">Coinbase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
