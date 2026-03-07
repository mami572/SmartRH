"use client"

import { AuthProvider } from "@/lib/auth-context"
import { SessionProvider } from "next-auth/react"

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
