"use client"

import { AuthProvider } from "@/providers/AuthProvider"
import { AnalyticsProvider } from "@/providers/AnalyticsProvider"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/marketing/CookieConsent"
import { ExitIntentPopup } from "@/components/marketing/ExitIntentPopup"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <WhatsAppButton />
      <Toaster richColors position="bottom-right" closeButton />
      <CookieConsent />
      <ExitIntentPopup />
      <AnalyticsProvider />
    </AuthProvider>
  )
}
