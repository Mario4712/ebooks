import { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Livraria Digital",
  description: "Respostas para as perguntas mais frequentes sobre a Livraria Digital.",
}

const faqs = [
  {
    category: "Compras",
    questions: [
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos PIX (pagamento instantâneo), cartão de crédito (via Mercado Pago, com opção de parcelamento) e criptomoedas (Bitcoin, Ethereum e outras, via Coinbase Commerce).",
      },
      {
        q: "É seguro comprar na Livraria Digital?",
        a: "Sim! Todos os pagamentos são processados por plataformas renomadas (Mercado Pago e Coinbase Commerce). Não armazenamos dados de cartão de crédito em nossos servidores.",
      },
      {
        q: "Posso usar cupom de desconto?",
        a: "Sim! Você pode inserir o código do cupom durante o checkout, na tela do carrinho. Cada cupom tem suas próprias condições de uso, como valor mínimo e data de validade.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "O parcelamento está disponível para pagamentos com cartão de crédito, com condições definidas pelo Mercado Pago. O número de parcelas disponíveis é exibido durante o checkout.",
      },
    ],
  },
  {
    category: "Downloads",
    questions: [
      {
        q: "Em quais formatos os e-books estão disponíveis?",
        a: "Oferecemos três formatos: PDF (ideal para leitura no computador), EPUB (para leitores digitais como Kobo) e MOBI (para Kindle). Nem todos os títulos possuem todos os formatos.",
      },
      {
        q: "Como faço para baixar meus e-books?",
        a: "Após a confirmação do pagamento, você receberá um e-mail com links de download. Também pode acessar a Biblioteca na sua conta para baixar a qualquer momento.",
      },
      {
        q: "Os links de download expiram?",
        a: "Os links enviados por e-mail expiram em 48 horas por segurança. Mas você pode gerar novos links a qualquer momento através da sua Biblioteca.",
      },
      {
        q: "O que é a marca d'água no PDF?",
        a: "Para proteção dos direitos autorais, adicionamos uma marca d'água discreta nos PDFs com informações do comprador. Isso não afeta a leitura e ajuda a combater a pirataria.",
      },
    ],
  },
  {
    category: "Conta",
    questions: [
      {
        q: "Como criar uma conta?",
        a: "Clique em 'Cadastrar' no menu superior. Você pode criar uma conta com e-mail e senha ou usar sua conta Google para acesso rápido.",
      },
      {
        q: "Esqueci minha senha, o que fazer?",
        a: "Acesse a página de login e clique em 'Esqueceu a senha?'. Enviaremos um link para redefinição de senha para o e-mail cadastrado.",
      },
      {
        q: "Como exportar meus dados?",
        a: "Em conformidade com a LGPD, você pode exportar todos os seus dados pessoais em formato JSON. Acesse Configurações > Exportar Dados na sua conta.",
      },
      {
        q: "Posso excluir minha conta?",
        a: "Sim. Acesse Configurações > Exclusão de Conta. Seus dados serão removidos em até 30 dias, exceto informações necessárias para obrigações legais.",
      },
    ],
  },
  {
    category: "Suporte",
    questions: [
      {
        q: "Como entro em contato com o suporte?",
        a: "Você pode nos contatar através da página de Contato ou enviar um e-mail para contato@livrariadigital.com. Respondemos em até 24 horas úteis.",
      },
      {
        q: "Posso solicitar reembolso?",
        a: "Por se tratar de produtos digitais, o reembolso é feito em casos de defeito no produto (arquivo corrompido ou conteúdo divergente). Entre em contato pelo suporte.",
      },
      {
        q: "Meu pagamento foi confirmado mas não recebi o e-book",
        a: "Verifique sua caixa de spam. Se o e-mail não estiver lá, acesse sua Biblioteca na conta. Caso o problema persista, entre em contato com nosso suporte.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Perguntas Frequentes</h1>
      <p className="text-muted-foreground text-lg mb-10">
        Encontre respostas para as dúvidas mais comuns sobre a Livraria Digital.
      </p>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="font-serif text-xl font-bold mb-4">{section.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((faq, index) => (
                <AccordionItem key={index} value={`${section.category}-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="font-serif text-xl font-bold mb-3">Não encontrou sua resposta?</h2>
        <p className="text-muted-foreground mb-4">
          Entre em contato conosco e teremos prazer em ajudar.
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
