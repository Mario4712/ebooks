import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Livraria Digital",
  description: "Política de Privacidade da Livraria Digital - Conheça como tratamos seus dados pessoais.",
}

export default function PrivacidadePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Política de Privacidade</h1>
      <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2026</p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">1. Introdução</h2>
          <p className="text-muted-foreground leading-relaxed">
            A Livraria Digital está comprometida com a proteção da privacidade dos seus usuários.
            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos
            seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">2. Dados Coletados</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Coletamos os seguintes dados pessoais:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li><strong>Dados de cadastro:</strong> nome, e-mail, CPF (opcional), senha criptografada</li>
            <li><strong>Dados de compra:</strong> histórico de pedidos, método de pagamento utilizado</li>
            <li><strong>Dados de navegação:</strong> endereço IP, cookies, páginas visitadas (mediante consentimento)</li>
            <li><strong>Dados de download:</strong> registro de downloads realizados, formato e horário</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">3. Finalidade do Tratamento</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Seus dados são utilizados para:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Processar compras e entregar e-books adquiridos</li>
            <li>Manter sua conta e histórico de pedidos</li>
            <li>Enviar e-mails transacionais (confirmação de compra, links de download)</li>
            <li>Enviar comunicações de marketing (somente com seu consentimento)</li>
            <li>Melhorar nossos serviços e experiência do usuário</li>
            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            <li>Aplicar marca d&apos;água em PDFs para proteção de propriedade intelectual</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">4. Base Legal</h2>
          <p className="text-muted-foreground leading-relaxed">
            O tratamento dos seus dados é realizado com base nas seguintes hipóteses legais da LGPD:
            execução de contrato (compra de e-books), consentimento (cookies e marketing),
            legítimo interesse (segurança e prevenção de fraudes) e cumprimento de obrigação legal
            (informações fiscais).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">5. Compartilhamento de Dados</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Seus dados podem ser compartilhados com:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li><strong>Processadores de pagamento:</strong> Mercado Pago e Coinbase Commerce, para processar transações</li>
            <li><strong>Provedores de infraestrutura:</strong> Amazon Web Services (armazenamento de arquivos)</li>
            <li><strong>Serviço de e-mail:</strong> Resend, para envio de e-mails transacionais</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">6. Seus Direitos (LGPD)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Você tem o direito de:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li><strong>Acessar</strong> seus dados pessoais armazenados</li>
            <li><strong>Corrigir</strong> dados incompletos ou desatualizados</li>
            <li><strong>Eliminar</strong> seus dados pessoais (exceto obrigações legais)</li>
            <li><strong>Exportar</strong> seus dados em formato portável (JSON)</li>
            <li><strong>Revogar</strong> consentimento para cookies e marketing</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Para exercer seus direitos, acesse a seção{" "}
            <a href="/configuracoes" className="text-primary hover:underline">Configurações</a>{" "}
            da sua conta ou entre em contato pelo e-mail contato@livrariadigital.com.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">7. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento da plataforma (autenticação, carrinho de compras)
            e cookies analíticos (Google Analytics) para entender como nosso site é utilizado.
            Cookies analíticos só são ativados após seu consentimento explícito, que pode ser
            gerenciado através do banner de cookies exibido no site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">8. Segurança</h2>
          <p className="text-muted-foreground leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
            criptografia de senhas (bcrypt), comunicação segura (HTTPS), tokens de download
            com expiração, rate limiting para prevenção de abusos, e controle de acesso
            baseado em papéis.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">9. Retenção de Dados</h2>
          <p className="text-muted-foreground leading-relaxed">
            Seus dados são mantidos enquanto sua conta estiver ativa e pelo período necessário
            para cumprimento de obrigações legais. Ao solicitar a exclusão da conta, seus dados
            serão removidos em até 30 dias, exceto informações necessárias para obrigações
            fiscais e legais.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">10. Contato</h2>
          <p className="text-muted-foreground leading-relaxed">
            Para dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em
            contato através do e-mail{" "}
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
