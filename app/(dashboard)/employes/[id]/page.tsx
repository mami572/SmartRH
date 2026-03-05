"use client"

import { use, useMemo } from "react"
import { notFound } from "next/navigation"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { BulletinPaie, Conge, Formation, Employee } from "@/lib/db/types"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone, MapPin, Calendar, Award } from "lucide-react"
import Link from "next/link"

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const empId = Number(id)
  const { employees: allEmployees, grades: allGrades, bulletins: rawBulletins, conges: allConges, formations: allFormations } = useMockDb()
  const employee = allEmployees.find(e => e.id_emp === empId)

  const data = useMemo(() => {
    if (!employee) return null
    const grade = allGrades.find((g) => g.id_grade === employee.grade_id)
    const manager = allEmployees.find((e) => e.id_emp === employee.manager_id)
    const subordinates = allEmployees.filter((e) => e.manager_id === employee.id_emp)
    const bulletins = rawBulletins.filter((b) => b.emp_id === employee.id_emp)
    const myConges = allConges.filter((c) => c.emp_id === employee.id_emp)
    const myFormations = allFormations.filter((f) => f.participants.includes(employee.id_emp))
    return { grade, manager, bulletins, conges: myConges, formations: myFormations, subordinates }
  }, [employee, empId])

  if (!employee || !data) {
    notFound()
  }

  const { grade, manager, bulletins, conges, formations, subordinates } = data
  const moisNoms = ["", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/employes"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Fiche Employe</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {employee.first_name[0]}{employee.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-1 text-center">
              <h2 className="text-lg font-bold">{employee.first_name} {employee.last_name}</h2>
              <Badge variant="outline" className="text-xs">{grade?.grade_name} - {grade?.description}</Badge>
              <StatusBadge status={employee.status} className="mt-1" />
            </div>
            <div className="mt-2 flex w-full flex-col gap-3 text-sm">
              {employee.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /><span>{employee.phone}</span>
                </div>
              )}
              {employee.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /><span>{employee.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Embauche le {new Date(employee.date_hire).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>{employee.salary_base.toLocaleString("fr-FR")} MRU / mois</span>
              </div>
              {manager && (
                <div className="mt-2 rounded-lg border p-3">
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
              <TabsTrigger value="bulletins">Bulletins de Paie ({bulletins.length})</TabsTrigger>
              <TabsTrigger value="conges">Conges ({conges.length})</TabsTrigger>
              <TabsTrigger value="formations">Formations ({formations.length})</TabsTrigger>
              {subordinates.length > 0 && <TabsTrigger value="equipe">Equipe ({subordinates.length})</TabsTrigger>}
            </TabsList>

            <TabsContent value="bulletins" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Periode</TableHead>
                        <TableHead>Brut</TableHead>
                        <TableHead>Cotisations</TableHead>
                        <TableHead>Primes</TableHead>
                        <TableHead>Net</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bulletins.map((b: BulletinPaie) => (
                        <TableRow key={b.id_bulletin}>
                          <TableCell className="font-medium">{moisNoms[b.mois]} {b.annee}</TableCell>
                          <TableCell>{b.salaire_brut.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="text-destructive">-{b.cotisations.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="text-emerald-600">+{b.primes.toLocaleString("fr-FR")}</TableCell>
                          <TableCell className="font-bold">{b.net_a_payer.toLocaleString("fr-FR")} MRU</TableCell>
                        </TableRow>
                      ))}
                      {bulletins.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="h-20 text-center text-muted-foreground">Aucun bulletin</TableCell></TableRow>
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
                      {conges.map((c: Conge) => (
                        <TableRow key={c.id_conge}>
                          <TableCell className="font-medium">{c.type}</TableCell>
                          <TableCell>{new Date(c.date_debut).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell>{new Date(c.date_fin).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell><StatusBadge status={c.statut} /></TableCell>
                        </TableRow>
                      ))}
                      {conges.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="h-20 text-center text-muted-foreground">Aucun conge</TableCell></TableRow>
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
                      {formations.map((f: Formation) => (
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

            {subordinates.length > 0 && (
              <TabsContent value="equipe" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employe</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subordinates.map((s: Employee) => (
                          <TableRow key={s.id_emp}>
                            <TableCell>
                              <Link href={`/employes/${s.id_emp}`} className="flex items-center gap-2 text-sm font-medium hover:underline">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{s.first_name[0]}{s.last_name[0]}</AvatarFallback>
                                </Avatar>
                                {s.first_name} {s.last_name}
                              </Link>
                            </TableCell>
                            <TableCell><StatusBadge status={s.status} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
