import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata = {
  title: "Cadastro | Livraria Digital",
  description: "Crie sua conta na Livraria Digital",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  )
}
