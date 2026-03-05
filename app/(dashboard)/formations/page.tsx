"use client"

import { useState, useMemo } from "react"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { Formation, FormationStatut } from "@/lib/db/types"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react"

export default function FormationsPage() {
  const [search, setSearch] = useState("")
  const [statutFilter, setStatutFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editFormation, setEditFormation] = useState<Formation | null>(null)
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const { formations: formationsList, employees: employeesList } = useMockDb()

  const filtered = useMemo(() => {
    return formationsList.filter((f) => {
      const matchSearch = f.nom.toLowerCase().includes(search.toLowerCase())
      const matchStatut = statutFilter === "all" || f.statut === statutFilter
      return matchSearch && matchStatut
    })
  }, [formationsList, search, statutFilter])

  const totalCout = filtered.reduce((sum, f) => sum + f.cout, 0)

  function handleSave(formData: FormData) {
    const data = {
      nom: formData.get("nom") as string,
      date_debut: formData.get("date_debut") as string,
      date_fin: formData.get("date_fin") as string,
      statut: formData.get("statut") as FormationStatut,
      cout: Number(formData.get("cout")),
      participants: editFormation?.participants || [],
    }
    // Mock save
    console.log("Mock save formation:", data)
    setDialogOpen(false)
    setEditFormation(null)
  }

  function handleDelete(id: number) {
    console.log("Mock delete formation:", id)
  }

  function openEdit(f: Formation) {
    setEditFormation(f)
    setDialogOpen(true)
  }

  function openNew() {
    setEditFormation(null)
    setDialogOpen(true)
  }

  function viewParticipants(f: Formation) {
    setSelectedFormation(f)
    setParticipantsDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Formations</h1>
          <p className="text-muted-foreground">
            Budget total: <span className="font-semibold text-foreground">{totalCout.toLocaleString("fr-FR")} MRU</span>
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditFormation(null) }}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Ajouter une formation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editFormation ? "Modifier la Formation" : "Nouvelle Formation"}</DialogTitle>
              <DialogDescription>{editFormation ? "Modifiez les informations" : "Planifiez une nouvelle session de formation"}</DialogDescription>
            </DialogHeader>
            <form action={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nom">Nom de la formation</Label>
                <Input id="nom" name="nom" defaultValue={editFormation?.nom || ""} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_debut">Date de debut</Label>
                  <Input id="date_debut" name="date_debut" type="date" defaultValue={editFormation?.date_debut || ""} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_fin">Date de fin</Label>
                  <Input id="date_fin" name="date_fin" type="date" defaultValue={editFormation?.date_fin || ""} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="statut">Statut</Label>
                  <select id="statut" name="statut" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" defaultValue={editFormation?.statut || "Planifiee"}>
                    <option value="Planifiee">Planifiee</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminee">Terminee</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cout">Cout (MRU)</Label>
                  <Input id="cout" name="cout" type="number" defaultValue={editFormation?.cout || ""} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editFormation ? "Mettre a jour" : "Enregistrer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Participants dialog */}
      <Dialog open={participantsDialogOpen} onOpenChange={setParticipantsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participants - {selectedFormation?.nom}</DialogTitle>
            <DialogDescription>{selectedFormation?.participants.length || 0} participant(s) inscrit(s)</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-auto">
            {selectedFormation?.participants.map((empId) => {
              const emp = employeesList.find((e) => e.id_emp === empId)
              if (!emp) return null
              return (
                <div key={empId} className="flex items-center gap-3 rounded-lg border p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{emp.first_name[0]}{emp.last_name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{emp.first_name} {emp.last_name}</span>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher une formation..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statutFilter} onValueChange={setStatutFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="Planifiee">Planifiee</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Terminee">Terminee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead className="hidden md:table-cell">Dates</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden md:table-cell">Cout</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((f) => (
                <TableRow key={f.id_formation}>
                  <TableCell className="font-medium">{f.nom}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {new Date(f.date_debut).toLocaleDateString("fr-FR")} - {new Date(f.date_fin).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell><StatusBadge status={f.statut} /></TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{f.cout.toLocaleString("fr-FR")} MRU</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 gap-1.5" onClick={() => viewParticipants(f)}>
                      <Users className="h-3.5 w-3.5" />
                      <Badge variant="secondary" className="text-xs">{f.participants.length}</Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(f)}>
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(f.id_formation)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Aucune formation trouvee</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
