"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/validations/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, Mail, MapPin, Clock, Phone, MessageCircle } from "lucide-react"
import { toast } from "sonner"

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const result = await res.json()
        toast.error(result.error || "Erro ao enviar mensagem")
      }
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.")
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="font-serif text-3xl font-bold mb-4">Mensagem Enviada!</h1>
        <p className="text-muted-foreground text-lg">
          Obrigado pelo contato. Responderemos o mais breve possivel.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="font-serif text-4xl font-bold mb-2">Fale Conosco</h1>
      <p className="text-muted-foreground text-lg mb-10">
        Tem alguma duvida, sugestao ou problema? Estamos aqui para ajudar.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envie sua mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" {...register("name")} placeholder="Seu nome" />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" {...register("subject")} placeholder="Assunto da mensagem" />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Escreva sua mensagem..."
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <a
            href="https://wa.me/5511999999999?text=Ola! Gostaria de saber mais sobre os e-books"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="hover:shadow-md transition-shadow border-green-200 hover:border-green-300">
              <CardContent className="p-6">
                <MessageCircle className="h-6 w-6 text-green-600 mb-3" />
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <p className="text-sm text-green-600 font-medium">(11) 99999-9999</p>
                <p className="text-xs text-muted-foreground mt-1">Atendimento rapido via mensagem</p>
              </CardContent>
            </Card>
          </a>
          <Card>
            <CardContent className="p-6">
              <Phone className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Telefone</h3>
              <a href="tel:+551130000000" className="text-sm text-primary hover:underline">(11) 3000-0000</a>
              <p className="text-xs text-muted-foreground mt-1">Seg-Sex, 9h as 18h</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Mail className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">E-mail</h3>
              <p className="text-sm text-muted-foreground">contato@livrariadigital.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Clock className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Horario de Atendimento</h3>
              <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h as 18h</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <MapPin className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Localizacao</h3>
              <p className="text-sm text-muted-foreground">Sao Paulo, SP - Brasil</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
