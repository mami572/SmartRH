"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search } from "lucide-react"
import type { Employee, EmployeeStatus } from "@/lib/db/types"
// createEmployee import removed as we use mock data

export default function EmployesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [gradeFilter, setGradeFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [, setRefresh] = useState(0)

  const { employees: employeesList, grades: gradesList, addEmployee } = useMockDb()

  const filtered = useMemo(() => {
    return employeesList.filter((e) => {
      const matchSearch = `${e.first_name} ${e.last_name}`.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "all" || e.status === statusFilter
      const matchGrade = gradeFilter === "all" || e.grade_id === Number(gradeFilter)
      return matchSearch && matchStatus && matchGrade
    })
  }, [employeesList, search, statusFilter, gradeFilter])

  function handleCreate(formData: FormData) {
    const data: Omit<Employee, "id_emp"> = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      date_birth: formData.get("date_birth") as string,
      date_hire: formData.get("date_hire") as string,
      grade_id: Number(formData.get("grade_id")),
      manager_id: formData.get("manager_id") ? Number(formData.get("manager_id")) : null,
      salary_base: Number(formData.get("salary_base")),
      status: "Active" as EmployeeStatus,
    }
    addEmployee(data)
    setDialogOpen(false)
    setRefresh((r) => r + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employes</h1>
          <p className="text-muted-foreground">Gestion du personnel ({filtered.length} resultats)</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Ajouter un employe</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nouvel Employe</DialogTitle>
              <DialogDescription>Remplissez les informations du nouvel employe</DialogDescription>
            </DialogHeader>
            <form action={handleCreate} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first_name">Prenom</Label>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <Input id="last_name" name="last_name" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_birth">Date de naissance</Label>
                  <Input id="date_birth" name="date_birth" type="date" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_hire">Date d{"'"}embauche</Label>
                  <Input id="date_hire" name="date_hire" type="date" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="grade_id">Grade</Label>
                  <select id="grade_id" name="grade_id" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" required>
                    {gradesList.map((g) => (
                      <option key={g.id_grade} value={g.id_grade}>{g.grade_name} - {g.description}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="salary_base">Salaire de base (MRU)</Label>
                  <Input id="salary_base" name="salary_base" type="number" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="manager_id">Manager (ID, optionnel)</Label>
                <Input id="manager_id" name="manager_id" type="number" />
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher un employe..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="Active">Actif</SelectItem>
                  <SelectItem value="Inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous grades</SelectItem>
                    {gradesList.map((g) => (
                     <SelectItem key={g.id_grade} value={String(g.id_grade)}>{g.grade_name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employe</TableHead>
                <TableHead className="hidden md:table-cell">Grade</TableHead>
                <TableHead className="hidden lg:table-cell">Date d{"'"}embauche</TableHead>
                <TableHead className="hidden md:table-cell">Salaire</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((emp) => {
                const grade = gradesList.find((g) => g.id_grade === emp.grade_id)
                return (
                  <TableRow key={emp.id_emp} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/employes/${emp.id_emp}`} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {emp.first_name[0]}{emp.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{emp.first_name} {emp.last_name}</span>
                          <span className="text-xs text-muted-foreground">{emp.phone || ""}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm">{grade?.grade_name || "-"}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm">{new Date(emp.date_hire).toLocaleDateString("fr-FR")}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm">{emp.salary_base.toLocaleString("fr-FR")} MRU</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={emp.status} />
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Aucun employe trouve
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
