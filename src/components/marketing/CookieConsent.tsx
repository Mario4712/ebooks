"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
    window.dispatchEvent(new Event("cookie-consent-change"))
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setVisible(false)
    window.dispatchEvent(new Event("cookie-consent-change"))
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center gap-4">
        <Cookie className="h-6 w-6 text-primary flex-shrink-0 hidden sm:block" />
        <p className="text-sm text-muted-foreground flex-1">
          Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site.
          Ao aceitar, você concorda com nossa{" "}
          <a href="/privacidade" className="underline hover:text-primary">
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Rejeitar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  )
}
