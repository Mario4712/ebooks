import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/cloudfront-signer"

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export { s3Client }

export async function getS3Object(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  })
  return s3Client.send(command)
}

export async function uploadToS3(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  })
  return s3Client.send(command)
}

export function getCloudFrontSignedUrl(key: string, expiresInSeconds = 3600): string {
  const url = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${key}`

  if (!process.env.AWS_CLOUDFRONT_PRIVATE_KEY || !process.env.AWS_CLOUDFRONT_KEY_PAIR_ID) {
    return url
  }

  return getSignedUrl({
    url,
    keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID,
    privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY,
    dateLessThan: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
  })
}
