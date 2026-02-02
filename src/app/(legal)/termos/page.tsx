import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | 筆言葉 Fude kotoba",
  description: "Termos de Uso da 筆言葉 Fude kotoba - Condições de uso da plataforma.",
}

export default function TermosPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Termos de Uso</h1>
      <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2026</p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">1. Aceitação dos Termos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ao acessar e utilizar a 筆言葉 Fude kotoba, você concorda com estes Termos de Uso.
            Se não concordar com algum dos termos, não utilize nossa plataforma. O uso continuado
            do site após alterações nestes termos implica aceitação das modificações.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">2. Cadastro e Conta</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Você deve fornecer informações verdadeiras e atualizadas no cadastro.</li>
            <li>É responsável por manter a confidencialidade da sua senha.</li>
            <li>Deve notificar imediatamente sobre qualquer uso não autorizado da sua conta.</li>
            <li>Uma conta por pessoa. Contas compartilhadas podem ser suspensas.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">3. Produtos e Preços</h2>
          <p className="text-muted-foreground leading-relaxed">
            Os e-books são produtos digitais entregues eletronicamente. Os preços são exibidos
            em Reais (BRL) e podem ser alterados sem aviso prévio, sendo garantido o preço
            vigente no momento da compra. Promoções e cupons de desconto têm condições
            específicas e podem ser encerrados a qualquer momento.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">4. Licença de Uso</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Ao adquirir um e-book, você recebe uma licença pessoal, intransferível e não exclusiva para:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Ler o conteúdo em seus dispositivos pessoais</li>
            <li>Fazer backup pessoal do arquivo</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">É expressamente proibido:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Redistribuir, compartilhar ou revender os e-books</li>
            <li>Remover ou alterar a marca d&apos;água dos PDFs</li>
            <li>Reproduzir o conteúdo total ou parcialmente sem autorização</li>
            <li>Utilizar métodos automatizados para download em massa</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">5. Pagamentos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aceitamos pagamentos via PIX, cartão de crédito (processado pelo Mercado Pago)
            e criptomoedas (processado pela Coinbase Commerce). O processamento do pagamento
            é realizado por terceiros e está sujeito aos termos de cada processador. A entrega
            dos e-books é condicionada à confirmação do pagamento.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">6. Política de Reembolso</h2>
          <p className="text-muted-foreground leading-relaxed">
            Por se tratar de produtos digitais com entrega imediata, aplicam-se as
            disposições do Código de Defesa do Consumidor. Caso haja defeito no produto
            (arquivo corrompido, conteúdo divergente do anunciado), o reembolso integral
            será efetuado em até 7 dias úteis. Solicitações devem ser feitas através
            da página de contato.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">7. Avaliações</h2>
          <p className="text-muted-foreground leading-relaxed">
            Usuários que adquiriram um e-book podem publicar avaliações. As avaliações
            passam por moderação e podem ser removidas caso contenham conteúdo ofensivo,
            spam, informações falsas ou violem direitos de terceiros. A 筆言葉 Fude kotoba
            reserva-se o direito de aprovar ou rejeitar avaliações.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">8. Propriedade Intelectual</h2>
          <p className="text-muted-foreground leading-relaxed">
            Todo o conteúdo da plataforma, incluindo textos, imagens, logotipos, layout
            e código-fonte, é protegido por direitos autorais. Os e-books são propriedade
            intelectual de seus respectivos autores e editores. A marca d&apos;água aplicada
            nos PDFs serve como medida de proteção e rastreabilidade.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">9. Limitação de Responsabilidade</h2>
          <p className="text-muted-foreground leading-relaxed">
            A 筆言葉 Fude kotoba não se responsabiliza por: danos decorrentes do uso ou
            impossibilidade de uso da plataforma; interrupções temporárias do serviço;
            conteúdo de links externos ou materiais de parceiros afiliados; decisões
            tomadas com base no conteúdo dos e-books.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">10. Modificações</h2>
          <p className="text-muted-foreground leading-relaxed">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
            Alterações significativas serão comunicadas por e-mail ou aviso no site.
            O uso continuado da plataforma após as alterações constitui aceitação dos
            novos termos.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">11. Foro</h2>
          <p className="text-muted-foreground leading-relaxed">
            Estes termos são regidos pela legislação brasileira. Fica eleito o foro da
            comarca de São Paulo/SP para dirimir quaisquer controvérsias.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">12. Contato</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dúvidas sobre estes termos podem ser esclarecidas pelo e-mail{" "}
            <a href="mailto:contato@livrariadigital.com" className="text-primary hover:underline">
              contato@livrariadigital.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
