"use client"

import { AuthProvider } from "@/providers/AuthProvider"
import { AnalyticsProvider } from "@/providers/AnalyticsProvider"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/marketing/CookieConsent"
import { ExitIntentPopup } from "@/components/marketing/ExitIntentPopup"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster richColors position="top-right" />
      <CookieConsent />
      <ExitIntentPopup />
      <AnalyticsProvider />
    </AuthProvider>
  )
}
