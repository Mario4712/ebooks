import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata = {
  title: "Login | Livraria Digital",
  description: "Faça login na sua conta da Livraria Digital",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
