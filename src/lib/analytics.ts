declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url })
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("event", action, params)
}

export function trackAddToCart(item: { id: string; name: string; price: number }) {
  trackEvent("add_to_cart", {
    currency: "BRL",
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, price: item.price }],
  })
}

export function trackRemoveFromCart(item: { id: string; name: string; price: number }) {
  trackEvent("remove_from_cart", {
    currency: "BRL",
    value: item.price,
    items: [{ item_id: item.id, item_name: item.name, price: item.price }],
  })
}

export function trackBeginCheckout(value: number, items: { id: string; name: string; price: number }[]) {
  trackEvent("begin_checkout", {
    currency: "BRL",
    value,
    items: items.map((i) => ({ item_id: i.id, item_name: i.name, price: i.price })),
  })
}

export function trackPurchase(transactionId: string, value: number, items: { id: string; name: string; price: number }[]) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    currency: "BRL",
    value,
    items: items.map((i) => ({ item_id: i.id, item_name: i.name, price: i.price })),
  })
}

export function trackSearch(searchTerm: string) {
  trackEvent("search", { search_term: searchTerm })
}
