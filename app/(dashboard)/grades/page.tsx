"use client"

import { useState, useMemo } from "react"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { Grade } from "@/lib/db/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default function GradesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editGrade, setEditGrade] = useState<Grade | null>(null)
  
  const { grades: gradesList, employees: employeesList } = useMockDb()

  const gradeWithCounts = useMemo(() => {
    return gradesList.map((g) => ({
      ...g,
      employeeCount: employeesList.filter((e) => e.grade_id === g.id_grade && e.status === "Active").length,
    }))
  }, [gradesList, employeesList])

  function handleSave(formData: FormData) {
    const data = {
      grade_name: formData.get("grade_name") as string,
      description: formData.get("description") as string,
      salary_base: Number(formData.get("salary_base")),
      bonus: Number(formData.get("bonus")),
    }
    // Mock save
    console.log("Mock save grade:", data)
    setDialogOpen(false)
    setEditGrade(null)
  }

  function handleDelete(id: number) {
    console.log("Mock delete grade:", id)
  }

  function openEdit(grade: Grade) {
    setEditGrade(grade)
    setDialogOpen(true)
  }

  function openNew() {
    setEditGrade(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades</h1>
          <p className="text-muted-foreground">Grille des grades et remunerations</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditGrade(null) }}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Ajouter un grade</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editGrade ? "Modifier le Grade" : "Nouveau Grade"}</DialogTitle>
              <DialogDescription>
                {editGrade ? "Modifiez les informations du grade" : "Remplissez les informations du nouveau grade"}
              </DialogDescription>
            </DialogHeader>
            <form action={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="grade_name">Code Grade</Label>
                  <Input id="grade_name" name="grade_name" defaultValue={editGrade?.grade_name || ""} required maxLength={10} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" defaultValue={editGrade?.description || ""} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="salary_base">Salaire de base (MRU)</Label>
                  <Input id="salary_base" name="salary_base" type="number" defaultValue={editGrade?.salary_base || ""} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bonus">Prime (MRU)</Label>
                  <Input id="bonus" name="bonus" type="number" defaultValue={editGrade?.bonus || 0} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editGrade ? "Mettre a jour" : "Enregistrer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Salaire de Base</TableHead>
                <TableHead>Prime</TableHead>
                <TableHead>Employes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeWithCounts.map((g) => (
                <TableRow key={g.id_grade}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono font-bold">{g.grade_name}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{g.description}</TableCell>
                  <TableCell className="text-sm font-medium">{g.salary_base.toLocaleString("fr-FR")} MRU</TableCell>
                  <TableCell className="text-sm text-emerald-600">+{g.bonus.toLocaleString("fr-FR")} MRU</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{g.employeeCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(g)}>
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(g.id_grade)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
