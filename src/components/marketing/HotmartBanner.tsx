"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Ad { id: string; title: string; description: string | null; targetUrl: string }

export function HotmartBanner() {
  const [ad, setAd] = useState<Ad | null>(null)

  useEffect(() => {
    fetch("/api/hotmart?position=banner")
      .then((r) => r.json())
      .then((ads: Ad[]) => {
        if (ads.length > 0) setAd(ads[0])
      })
      .catch(() => {})
  }, [])

  if (!ad) return null

  function handleClick() {
    fetch("/api/hotmart/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId: ad!.id }),
    })
  }

  return (
    <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-serif text-xl font-bold mb-2">{ad.title}</h3>
        {ad.description && <p className="text-muted-foreground mb-4">{ad.description}</p>}
        <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
          <Button variant="default">
            Saiba Mais <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  )
}
