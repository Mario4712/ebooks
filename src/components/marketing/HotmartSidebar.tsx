"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Ad { id: string; title: string; description: string | null; targetUrl: string }

export function HotmartSidebar() {
  const [ad, setAd] = useState<Ad | null>(null)

  useEffect(() => {
    fetch("/api/admin/hotmart")
      .then((r) => r.json())
      .then((ads: Ad[]) => {
        const sidebar = ads.find((a: any) => a.position === "sidebar" && a.active)
        if (sidebar) setAd(sidebar)
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
    <Card className="bg-amber-50/50">
      <CardContent className="p-4 text-center space-y-2">
        <p className="text-sm font-semibold">{ad.title}</p>
        {ad.description && <p className="text-xs text-muted-foreground">{ad.description}</p>}
        <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
          <Button size="sm" variant="outline" className="w-full">
            Ver Oferta <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}
