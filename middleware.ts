export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employes/:path*",
    "/utilisateurs/:path*",
    "/grades/:path*",
    "/formations/:path*",
    "/paie/:path*",
    "/conges/:path*",
    "/profil/:path*",
  ]
}
