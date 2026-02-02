import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { uploadToS3 } from "@/lib/s3"
import sharp from "sharp"
import { randomUUID } from "crypto"
import { requireStaff } from "@/lib/permissions"

export async function POST(req: Request) {
  const session = await auth()
  const denied = requireStaff(session)
  if (denied) return denied

  if (!process.env.AWS_S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID) {
    return NextResponse.json(
      { error: "AWS S3 nao configurado. Configure as variaveis AWS_S3_BUCKET, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY no .env" },
      { status: 503 }
    )
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Formato invalido. Use JPEG, PNG ou WebP." }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Arquivo muito grande. Maximo 10MB." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const id = randomUUID()

    const mainImage = await sharp(buffer)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()

    const thumbnail = await sharp(buffer)
      .resize(300, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer()

    const mainKey = `images/${id}.webp`
    const thumbKey = `images/${id}-thumb.webp`

    await Promise.all([
      uploadToS3(mainKey, mainImage, "image/webp"),
      uploadToS3(thumbKey, thumbnail, "image/webp"),
    ])

    const domain = process.env.AWS_CLOUDFRONT_DOMAIN || `${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`
    const url = `https://${domain}/${mainKey}`
    const thumbnailUrl = `https://${domain}/${thumbKey}`

    return NextResponse.json({ url, thumbnailUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Erro ao processar imagem" }, { status: 500 })
  }
}
