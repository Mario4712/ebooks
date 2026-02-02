import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Google OAuth (optional but recommended)
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),

  // AWS S3
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_CLOUDFRONT_DOMAIN: z.string().optional(),
  AWS_CLOUDFRONT_KEY_PAIR_ID: z.string().optional(),
  AWS_CLOUDFRONT_PRIVATE_KEY: z.string().optional(),

  // Payment gateways
  MERCADO_PAGO_ACCESS_TOKEN: z.string().optional(),
  MERCADO_PAGO_PUBLIC_KEY: z.string().optional(),
  COINBASE_API_KEY: z.string().optional(),
  COINBASE_WEBHOOK_SECRET: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Cron / Logging
  CRON_SECRET: z.string().optional(),
  LOG_RETENTION_DAYS: z.coerce.number().optional(),

  // Analytics (client-side, NEXT_PUBLIC_ not validated here)
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_HOTJAR_ID: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    const errorMessages = Object.entries(errors)
      .map(([key, msgs]) => `  ${key}: ${msgs?.join(", ")}`)
      .join("\n")

    console.error("Environment validation failed:\n" + errorMessages)

    // Only throw in production - in dev, warn but continue
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing required environment variables. Check server logs.")
    }
  }

  return result.data || (process.env as unknown as Env)
}

export const env = validateEnv()
