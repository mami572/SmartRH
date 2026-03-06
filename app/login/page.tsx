"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Identifiants invalides. Veuillez réessayer.")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-teal-900 to-slate-900 px-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      
      <Card className="w-full max-w-md shadow-2xl border-none bg-white/95 backdrop-blur-sm overflow-hidden transform transition-all hover:scale-[1.01]">
        <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 blur opacity-30 animate-pulse"></div>
              <div className="relative rounded-2xl bg-teal-600 p-4 shadow-xl">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight text-slate-900">
            Smart<span className="text-teal-600">RH</span>
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            Connectez-vous à votre portail RH sécurisé
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-700 py-3 animate-in fade-in slide-in-from-top-2">
                <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold text-sm">Email professionnel</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-teal-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.com"
                  className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 bg-slate-50/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-sm">Mot de passe</Label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-teal-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 bg-slate-50/50 transition-all"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pb-8 px-8">
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-teal-600/20 transition-all hover:shadow-teal-600/40 active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
            <div className="w-full flex items-center justify-center space-x-2">
              <div className="h-px bg-slate-200 w-1/4"></div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 whitespace-nowrap">
                © 2026 SmartRH Mauritanie
              </p>
              <div className="h-px bg-slate-200 w-1/4"></div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
