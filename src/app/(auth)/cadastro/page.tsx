import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata = {
  title: "Cadastro | 筆言葉 Fude kotoba",
  description: "Crie sua conta na 筆言葉 Fude kotoba",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  )
}
