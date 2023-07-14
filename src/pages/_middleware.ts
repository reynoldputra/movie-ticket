export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/topup",
    "/withdraw",
    "/transaction",
    "/ticket",
    "/payment/:path*",
  ] 
}
