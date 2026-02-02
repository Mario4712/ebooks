"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Ola! Preciso de ajuda com a 筆言葉 Fude kotoba"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  )
}
