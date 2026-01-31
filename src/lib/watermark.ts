import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

export async function watermarkPdf(
  pdfBytes: Uint8Array,
  buyerInfo: { name: string; email: string; orderId: string }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()

  const watermarkText = `Licenciado para: ${buyerInfo.name} (${buyerInfo.email}) - Pedido: ${buyerInfo.orderId}`

  for (const page of pages) {
    const { width } = page.getSize()
    const fontSize = 7
    const textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize)
    const x = (width - textWidth) / 2

    page.drawText(watermarkText, {
      x,
      y: 15,
      size: fontSize,
      font: helvetica,
      color: rgb(0.7, 0.7, 0.7),
      opacity: 0.5,
    })
  }

  return pdfDoc.save()
}
