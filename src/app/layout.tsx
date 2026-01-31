import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/layout/ClientLayout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: "Livraria Digital | E-books de Qualidade",
    template: "%s | Livraria Digital",
  },
  description: "Sua livraria digital com os melhores e-books de programação, marketing, empreendedorismo e mais. Entrega instantânea em PDF, EPUB e MOBI.",
  keywords: ["ebooks", "livros digitais", "programação", "marketing digital", "empreendedorismo"],
  authors: [{ name: "Livraria Digital" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Livraria Digital",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
