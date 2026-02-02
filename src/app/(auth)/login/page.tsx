import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata = {
  title: "Login | 筆言葉 Fude kotoba",
  description: "Faça login na sua conta da 筆言葉 Fude kotoba",
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
