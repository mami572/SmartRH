"use client"

import { useState, useMemo } from "react"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { User, UserRole } from "@/lib/db/types"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

const roleColors: Record<string, string> = {
  HR: "bg-teal-50 text-teal-700 border-teal-200",
  Manager: "bg-amber-50 text-amber-700 border-amber-200",
  Employee: "bg-sky-50 text-sky-700 border-sky-200",
}

const roleLabels: Record<string, string> = {
  HR: "Ressources Humaines",
  Manager: "Manager",
  Employee: "Employe",
}

export default function UtilisateursPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [, setRefresh] = useState(0)

  const { users: usersList, employees: employeesList, addUser } = useMockDb()

  const filtered = useMemo(() => {
    return usersList.filter((u) => {
      const emp = employeesList.find((e) => e.id_emp === u.emp_id)
      const name = emp ? `${emp.first_name} ${emp.last_name}` : ""
      return u.email.toLowerCase().includes(search.toLowerCase()) || name.toLowerCase().includes(search.toLowerCase())
    })
  }, [usersList, employeesList, search])

  function handleSave(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password_hash: "hashed",
      role: formData.get("role") as UserRole,
      emp_id: Number(formData.get("emp_id")),
    }
    addUser(data)
    setDialogOpen(false)
    setEditUser(null)
    setRefresh((r) => r + 1)
  }

  function handleDelete(id: number) {
    console.log("Mock delete:", id)
    setRefresh((r) => r + 1)
  }

  function openEdit(user: User) {
    setEditUser(user)
    setDialogOpen(true)
  }

  function openNew() {
    setEditUser(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">Gestion des comptes et des roles ({usersList.length} comptes)</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditUser(null) }}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Ajouter un utilisateur</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editUser ? "Modifier l'Utilisateur" : "Nouvel Utilisateur"}</DialogTitle>
              <DialogDescription>{editUser ? "Modifiez les informations du compte" : "Creez un nouveau compte utilisateur"}</DialogDescription>
            </DialogHeader>
            <form action={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" name="email" type="email" defaultValue={editUser?.email || ""} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <select id="role" name="role" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" defaultValue={editUser?.role || "Employee"}>
                  <option value="Employee">Employe</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">Ressources Humaines</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="emp_id">Employe associe</Label>
                <select id="emp_id" name="emp_id" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" defaultValue={editUser?.emp_id || ""} required>
                  <option value="">Selectionner un employe</option>
                  {employeesList.map((e) => (
                    <option key={e.id_emp} value={e.id_emp}>{e.first_name} {e.last_name}</option>
                  ))}
                </select>
              </div>
              <DialogFooter>
                <Button type="submit">{editUser ? "Mettre a jour" : "Enregistrer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher par email ou nom..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Employe associe</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => {
                const emp = employeesList.find((e) => e.id_emp === u.emp_id)
                return (
                  <TableRow key={u.id_user}>
                    <TableCell className="font-medium text-sm">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${roleColors[u.role] || ""}`}>
                        {roleLabels[u.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{emp ? `${emp.first_name} ${emp.last_name}` : "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(u)}>
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(u.id_user)}>
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={4} className="h-24 text-center text-muted-foreground">Aucun utilisateur trouve</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
