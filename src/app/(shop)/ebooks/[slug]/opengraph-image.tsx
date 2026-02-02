import { ImageResponse } from "next/og"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const alt = "E-book"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const ebook = await prisma.ebook.findUnique({
    where: { slug },
    select: { title: true, author: true, price: true, category: true },
  })

  if (!ebook) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1D3557",
            color: "white",
            fontSize: 48,
            fontFamily: "serif",
          }}
        >
          筆言葉 Fude kotoba
        </div>
      ),
      { ...size }
    )
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(ebook.price)

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#1D3557",
          color: "white",
          padding: 60,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#F4A261",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {ebook.category}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 20,
              maxWidth: 800,
            }}
          >
            {ebook.title}
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, marginBottom: 32 }}>
            por {ebook.author}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#F4A261",
              }}
            >
              {formattedPrice}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 600 }}>筆言葉 Fude kotoba</div>
          <div style={{ fontSize: 18, opacity: 0.6 }}>
            PDF &bull; EPUB &bull; MOBI
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
