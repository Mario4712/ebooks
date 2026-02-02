import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { uploadToS3 } from "@/lib/s3"
import sharp from "sharp"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 })
  }

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

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Arquivo muito grande. Maximo 5MB." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const avatar = await sharp(buffer)
      .resize(200, 200, { fit: "cover" })
      .webp({ quality: 80 })
      .toBuffer()

    const key = `avatars/${session.user.id}.webp`
    await uploadToS3(key, avatar, "image/webp")

    const domain = process.env.AWS_CLOUDFRONT_DOMAIN || `${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`
    const url = `https://${domain}/${key}`

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: url },
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Avatar upload error:", error)
    return NextResponse.json({ error: "Erro ao processar imagem" }, { status: 500 })
  }
}
