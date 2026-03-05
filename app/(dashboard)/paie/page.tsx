"use client"

import { useState, useMemo } from "react"
import { bulletinsPaie, employees, grades } from "@/lib/db/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

const moisNoms = ["", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

export default function PaiePage() {
  const [search, setSearch] = useState("")
  const [moisFilter, setMoisFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [, setRefresh] = useState(0)

  const employeesList = employees
  const gradesList = grades
  const bulletinsList = bulletinsPaie

  const filtered = useMemo(() => {
    return bulletinsList.filter((b) => {
      const emp = employeesList.find((e) => e.id_emp === b.emp_id)
      const matchSearch = emp ? `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(search.toLowerCase()) : false
      const matchMois = moisFilter === "all" || b.mois === Number(moisFilter)
      return matchSearch && matchMois
    }).sort((a, b) => b.annee - a.annee || b.mois - a.mois)
  }, [bulletinsList, employeesList, search, moisFilter])

  const totalNet = filtered.reduce((sum, b) => sum + b.net_a_payer, 0)

  function handleCreate(formData: FormData) {
    const empId = Number(formData.get("emp_id"))
    const emp = employeesList.find((e) => e.id_emp === empId)
    const grade = emp ? gradesList.find((g) => g.id_grade === emp.grade_id) : null
    const primes = grade?.bonus || 0
    const brut = (emp?.salary_base || 0) + primes
    const cotisations = Math.round(brut * 0.15)

    // Mock create bulletin
    console.log("Mock generate bulletin:", {
      emp_id: empId,
      mois: Number(formData.get("mois")),
      annee: Number(formData.get("annee")),
      salaire_brut: brut,
      cotisations,
      primes,
      net_a_payer: brut - cotisations,
      date_generation: new Date().toISOString().split("T")[0],
    })
    setDialogOpen(false)
    setRefresh((r) => r + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paie</h1>
          <p className="text-muted-foreground">
            Bulletins de salaire - Total net: <span className="font-semibold text-foreground">{totalNet.toLocaleString("fr-FR")} MRU</span>
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Generer un bulletin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generer un Bulletin de Paie</DialogTitle>
              <DialogDescription>Le salaire est calcule automatiquement depuis le grade</DialogDescription>
            </DialogHeader>
            <form action={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="emp_id">Employe</Label>
                <select id="emp_id" name="emp_id" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" required>
                  {employeesList.filter((e) => e.status === "Active").map((e) => (
                    <option key={e.id_emp} value={e.id_emp}>{e.first_name} {e.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="mois">Mois</Label>
                  <select id="mois" name="mois" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" required>
                    {moisNoms.slice(1).map((nom, idx) => (
                      <option key={idx + 1} value={idx + 1}>{nom}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="annee">Annee</Label>
                  <Input id="annee" name="annee" type="number" defaultValue={2026} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Generer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher par employe..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={moisFilter} onValueChange={setMoisFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les mois</SelectItem>
              {moisNoms.slice(1).map((nom, idx) => (
                <SelectItem key={idx + 1} value={String(idx + 1)}>{nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employe</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead className="hidden md:table-cell">Brut</TableHead>
                <TableHead className="hidden md:table-cell">Cotisations</TableHead>
                <TableHead className="hidden md:table-cell">Primes</TableHead>
                <TableHead>Net a Payer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => {
                const emp = employeesList.find((e) => e.id_emp === b.emp_id)
                return (
                  <TableRow key={b.id_bulletin}>
                    <TableCell className="font-medium">{emp ? `${emp.first_name} ${emp.last_name}` : "Inconnu"}</TableCell>
                    <TableCell><Badge variant="outline" className="font-mono text-xs">{moisNoms[b.mois]} {b.annee}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell">{b.salaire_brut.toLocaleString("fr-FR")}</TableCell>
                    <TableCell className="hidden md:table-cell text-destructive">-{b.cotisations.toLocaleString("fr-FR")}</TableCell>
                    <TableCell className="hidden md:table-cell text-emerald-600">+{b.primes.toLocaleString("fr-FR")}</TableCell>
                    <TableCell className="font-bold">{b.net_a_payer.toLocaleString("fr-FR")} MRU</TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Aucun bulletin trouve</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
