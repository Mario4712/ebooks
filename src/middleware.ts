import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth

export const config = {
  matcher: [
    "/biblioteca/:path*",
    "/pedidos/:path*",
    "/configuracoes/:path*",
    "/favoritos/:path*",
    "/admin/:path*",
  ],
}
