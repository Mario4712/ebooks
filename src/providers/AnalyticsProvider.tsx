"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { GA_MEASUREMENT_ID, pageview } from "@/lib/analytics"

export function AnalyticsProvider() {
  const pathname = usePathname()
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent")
      setHasConsent(consent === "accepted")
    }

    checkConsent()
    window.addEventListener("cookie-consent-change", checkConsent)
    return () => window.removeEventListener("cookie-consent-change", checkConsent)
  }, [])

  useEffect(() => {
    if (hasConsent && pathname) {
      pageview(pathname)
    }
  }, [pathname, hasConsent])

  if (!hasConsent || !GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
