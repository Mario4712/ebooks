"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface IdentificationStepProps {
  onComplete: () => void
}

export function IdentificationStep({ onComplete }: IdentificationStepProps) {
  const { data: session } = useSession()

  if (session) {
    onComplete()
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Para finalizar sua compra, você precisa estar logado.
        </p>
        <div className="flex gap-4">
          <Link href="/login?callbackUrl=/checkout">
            <Button>Fazer Login</Button>
          </Link>
          <Link href="/cadastro?callbackUrl=/checkout">
            <Button variant="outline">Criar Conta</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
