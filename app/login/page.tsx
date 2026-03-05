"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const { login, availableUsers } = useAuth()
  const router = useRouter()
  const [selectedEmail, setSelectedEmail] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedEmail) {
      setError("Veuillez selectionner un utilisateur")
      return
    }
    const success = login(selectedEmail)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Identifiants incorrects")
    }
  }

  const roleColors: Record<string, string> = {
    HR: "bg-teal-100 text-teal-800 border-teal-200",
    Manager: "bg-amber-100 text-amber-800 border-amber-200",
    Employee: "bg-sky-100 text-sky-800 border-sky-200",
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-balance">SmartRH Mauritanie</CardTitle>
          <CardDescription className="text-pretty">
            Connectez-vous pour acceder au systeme de gestion RH
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="user-select">Utilisateur</Label>
              <Select value={selectedEmail} onValueChange={(v) => { setSelectedEmail(v); setError("") }}>
                <SelectTrigger id="user-select">
                  <SelectValue placeholder="Selectionner un utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((u) => (
                    <SelectItem key={u.email} value={u.email}>
                      <span className="flex items-center gap-2">
                        {u.name}
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roleColors[u.role] || ""}`}>
                          {u.role}
                        </Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="Mot de passe (demo)" defaultValue="demo" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
