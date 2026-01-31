"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface HotmartAd {
  id: string
  title: string
  imageUrl: string
  targetUrl: string
}

export function HotmartInline() {
  const [ad, setAd] = useState<HotmartAd | null>(null)

  useEffect(() => {
    fetch("/api/admin/hotmart?position=INLINE&active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.ads?.length > 0) {
          setAd(data.ads[Math.floor(Math.random() * data.ads.length)])
        }
      })
      .catch(() => {})
  }, [])

  if (!ad) return null

  const handleClick = () => {
    fetch("/api/hotmart/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId: ad.id }),
    }).catch(() => {})
  }

  return (
    <a
      href={ad.targetUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className="block my-6 rounded-lg border bg-muted/50 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden">
          <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Patrocinado</p>
          <p className="font-medium truncate">{ad.title}</p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </div>
    </a>
  )
}
