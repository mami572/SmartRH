"use client"

import { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { BulletinPaie, Conge, Formation } from "@/lib/db/types"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, MapPin, Calendar, Award, Briefcase } from "lucide-react"

export default function ProfilPage() {
  const { employee, role } = useAuth()
  const { grades: allGrades, employees: allEmployees, bulletins: rawBulletins, conges: allConges, formations: allFormations } = useMockDb()

  const data = useMemo(() => {
    if (!employee) return null
    const grade = allGrades.find(g => g.id_grade === employee.grade_id)
    const manager = employee.manager_id ? allEmployees.find((e) => e.id_emp === employee.manager_id) : null
    const myBulletins = rawBulletins.filter(b => b.emp_id === employee.id_emp)
    const myConges = allConges.filter(c => c.emp_id === employee.id_emp)
    const myFormations = allFormations.filter((f) => f.participants.includes(employee.id_emp))
    return { grade, manager, bulletins: myBulletins, conges: myConges, formations: myFormations }
  }, [employee])

  if (!employee || !data) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Impossible de charger le profil
      </div>
    )
  }

  const { grade, manager, bulletins, conges, formations } = data
  const moisNoms = ["", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

  const roleLabel: Record<string, string> = {
    HR: "Ressources Humaines",
    Manager: "Manager",
    Employee: "Employe",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
        <p className="text-muted-foreground">Vos informations personnelles et professionnelles</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                {employee.first_name[0]}{employee.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2 className="text-xl font-bold">{employee.first_name} {employee.last_name}</h2>
              <Badge variant="outline" className="text-xs">{grade?.grade_name} - {grade?.description}</Badge>
              <Badge className="mt-1 text-xs">{role ? roleLabel[role] : ""}</Badge>
            </div>
            <div className="mt-3 flex w-full flex-col gap-3 text-sm">
              {employee.phone && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" /><span>{employee.phone}</span>
                </div>
              )}
              {employee.address && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" /><span>{employee.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Ne(e) le {new Date(employee.date_birth).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="h-4 w-4 shrink-0" />
                <span>Embauche le {new Date(employee.date_hire).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="h-4 w-4 shrink-0" />
                <span>{employee.salary_base.toLocaleString("fr-FR")} MRU / mois</span>
              </div>
              {manager && (
                <div className="mt-3 rounded-lg border p-3">
                  <span className="text-xs text-muted-foreground">Manager</span>
                  <p className="text-sm font-medium">{manager.first_name} {manager.last_name}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="bulletins">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="bulletins">Mes Bulletins ({bulletins.length})</TabsTrigger>
              <TabsTrigger value="conges">Mes Conges ({conges.length})</TabsTrigger>
              <TabsTrigger value="formations">Mes Formations ({formations.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="bulletins" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Periode</TableHead>
                        <TableHead>Brut</TableHead>
                        <TableHead className="hidden md:table-cell">Cotisations</TableHead>
                        <TableHead className="hidden md:table-cell">Primes</TableHead>
                        <TableHead>Net a Payer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.bulletins.map((b: BulletinPaie) => (
                        <TableRow key={b.id_bulletin}>
                          <TableCell className="font-medium">{moisNoms[b.mois]} {b.annee}</TableCell>
                          <TableCell>{b.salaire_brut.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="hidden md:table-cell text-destructive">-{b.cotisations.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="hidden md:table-cell text-emerald-600">+{b.primes.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="font-bold">{b.net_a_payer.toLocaleString("fr-FR")} MRU</TableCell>
                        </TableRow>
                      ))}
                      {bulletins.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="h-20 text-center text-muted-foreground">Aucun bulletin disponible</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conges" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Du</TableHead>
                        <TableHead>Au</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.conges.map((c: Conge) => (
                        <TableRow key={c.id_conge}>
                          <TableCell className="font-medium">{c.type}</TableCell>
                          <TableCell>{new Date(c.date_debut).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell>{new Date(c.date_fin).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell><StatusBadge status={c.statut} /></TableCell>
                        </TableRow>
                      ))}
                      {conges.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="h-20 text-center text-muted-foreground">Aucun conge enregistre</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formations" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Formation</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.formations.map((f: Formation) => (
                        <TableRow key={f.id_formation}>
                          <TableCell className="font-medium">{f.nom}</TableCell>
                          <TableCell>{new Date(f.date_debut).toLocaleDateString("fr-FR")} - {new Date(f.date_fin).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell><StatusBadge status={f.statut} /></TableCell>
                        </TableRow>
                      ))}
                      {formations.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="h-20 text-center text-muted-foreground">Aucune formation</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
