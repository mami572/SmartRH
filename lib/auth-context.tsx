"use client"

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User, Employee, UserRole } from "@/lib/db/types"
import { users, employees } from "@/lib/db/mock-data"
import { useSession, signOut } from "next-auth/react"

interface AuthState {
  user: User | null
  employee: Employee | null
  role: UserRole | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string) => boolean // Keep for compatibility if needed
  logout: () => void
  availableUsers: { email: string; role: UserRole; name: string }[]
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [state, setState] = useState<AuthState>({
    user: null,
    employee: null,
    role: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    if (status === "loading") {
      setState(s => ({ ...s, isLoading: true }))
      return
    }

    if (session?.user) {
      const email = session.user.email
      const user = users.find((u) => u.email === email) || null
      const emp = user ? employees.find((e) => e.id_emp === user.emp_id) : null
      
      setState({
        user,
        employee: emp || null,
        role: (session.user as any).role || user?.role || null,
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      setState({
        user: null,
        employee: null,
        role: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }, [session, status])

  const login = useCallback((email: string): boolean => {
    // This is now handled by next-auth signIn() in the login page
    // but we keep the mock logic for fallback/compatibility
    const user = users.find((u) => u.email === email)
    if (!user) return false
    return true
  }, [])

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/login" })
  }, [])

  const availableUsers = users.map((u) => {
    const emp = employees.find((e) => e.id_emp === u.emp_id)
    return {
      email: u.email,
      role: u.role,
      name: emp ? `${emp.first_name} ${emp.last_name}` : u.email,
    }
  })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, availableUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
