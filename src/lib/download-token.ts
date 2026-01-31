import jwt from "jsonwebtoken"

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "dev-download-secret"

interface DownloadTokenPayload {
  userId: string
  ebookId: string
  format: string
}

export function generateDownloadToken(payload: DownloadTokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "48h" })
}

export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as DownloadTokenPayload
  } catch {
    return null
  }
}
