import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const ebooks = await prisma.ebook.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true, category: true },
  })

  const ebookUrls = ebooks.map((ebook) => ({
    url: `${baseUrl}/ebooks/${ebook.slug}`,
    lastModified: ebook.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const categories = [...new Set(ebooks.map((e) => e.category))]
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/ebooks?category=${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/ebooks`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...categoryUrls,
    ...ebookUrls,
  ]
}
