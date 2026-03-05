"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User, Employee, UserRole } from "@/lib/db/types"
import { users } from "@/lib/db/mock-data"
import { employees } from "@/lib/db/mock-data"

interface AuthState {
  user: User | null
  employee: Employee | null
  role: UserRole | null
  isAuthenticated: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string) => boolean
  logout: () => void
  availableUsers: { email: string; role: UserRole; name: string }[]
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    employee: null,
    role: null,
    isAuthenticated: false,
  })

  const login = useCallback((email: string): boolean => {
    const user = users.find((u) => u.email === email)
    if (!user) return false
    const emp = employees.find((e) => e.id_emp === user.emp_id) || null
    setState({
      user,
      employee: emp,
      role: user.role,
      isAuthenticated: true,
    })
    return true
  }, [])

  const logout = useCallback(() => {
    setState({ user: null, employee: null, role: null, isAuthenticated: false })
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
