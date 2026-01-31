import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { verifyDownloadToken } from "@/lib/download-token"
import { getS3Object } from "@/lib/s3"
import { watermarkPdf } from "@/lib/watermark"
import { ratelimit } from "@/lib/redis"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Rate limiting
    if (ratelimit) {
      const { success } = await ratelimit.limit(session.user.id)
      if (!success) {
        return NextResponse.json({ error: "Muitas requisições. Tente novamente mais tarde." }, { status: 429 })
      }
    }

    const { token } = await params
    const payload = verifyDownloadToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Link expirado ou inválido" }, { status: 403 })
    }

    if (payload.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 })
    }

    // Verify ownership
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        ebookId: payload.ebookId,
        order: { userId: session.user.id, status: "PAID" },
      },
    })

    if (!hasPurchased) {
      return NextResponse.json({ error: "E-book não adquirido" }, { status: 403 })
    }

    const ebook = await prisma.ebook.findUnique({ where: { id: payload.ebookId } })
    if (!ebook) {
      return NextResponse.json({ error: "E-book não encontrado" }, { status: 404 })
    }

    // Get file URL based on format
    const fileUrlMap: Record<string, string | null> = {
      pdf: ebook.pdfUrl,
      epub: ebook.epubUrl,
      mobi: ebook.mobiUrl,
    }

    const fileUrl = fileUrlMap[payload.format]
    if (!fileUrl) {
      return NextResponse.json({ error: "Formato não disponível" }, { status: 404 })
    }

    // Record download
    await prisma.download.create({
      data: {
        userId: session.user.id,
        ebookId: payload.ebookId,
        format: payload.format,
        ip: request.headers.get("x-forwarded-for") || "unknown",
      },
    })

    // Get file from S3 and apply watermark for PDFs
    try {
      const s3Response = await getS3Object(fileUrl)
      const bodyBytes = await s3Response.Body?.transformToByteArray()

      if (!bodyBytes) {
        return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 })
      }

      let fileBytes = bodyBytes
      const user = await prisma.user.findUnique({ where: { id: session.user.id } })

      if (payload.format === "pdf" && user) {
        fileBytes = await watermarkPdf(bodyBytes, {
          name: user.name || user.email,
          email: user.email,
          orderId: hasPurchased.orderId,
        })
      }

      const ext = payload.format
      const filename = `${ebook.slug}.${ext}`

      return new NextResponse(Buffer.from(fileBytes), {
        headers: {
          "Content-Type": ext === "pdf" ? "application/pdf" : "application/octet-stream",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      })
    } catch {
      return NextResponse.json({ error: "Erro ao processar arquivo" }, { status: 500 })
    }
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Erro no download" }, { status: 500 })
  }
}
