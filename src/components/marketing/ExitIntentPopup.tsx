"use client"

import { useState, useCallback } from "react"
import { useExitIntent } from "@/hooks/useExitIntent"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const couponCode = "BEMVINDO10"

  const handleExitIntent = useCallback(() => {
    setOpen(true)
    sessionStorage.setItem("exit-intent-shown", "true")
  }, [])

  useExitIntent({ onExitIntent: handleExitIntent })

  const handleCopy = async () => {
    await navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="font-serif text-2xl">Espere! Temos um presente</DialogTitle>
          <DialogDescription className="text-base">
            Ganhe 10% de desconto na sua primeira compra usando o cupom abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 my-4">
          <code className="rounded-lg border bg-muted px-6 py-3 text-lg font-bold tracking-wider">
            {couponCode}
          </code>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={() => setOpen(false)}>
            Continuar Comprando
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Não, obrigado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
