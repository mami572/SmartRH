"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import type { CongeStatut } from "@/lib/db/types"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Check, X } from "lucide-react"

export default function CongesPage() {
  const { role, employee } = useAuth()
  const [search, setSearch] = useState("")
  const [statutFilter, setStatutFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { conges: congesList, employees: employeesList } = useMockDb()

  const filtered = useMemo(() => {
    return congesList.filter((c) => {
      const emp = employeesList.find((e) => e.id_emp === c.emp_id)
      const matchSearch = emp ? `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(search.toLowerCase()) : false
      const matchStatut = statutFilter === "all" || c.statut === statutFilter
      return matchSearch && matchStatut
    })
  }, [congesList, employeesList, search, statutFilter])

  function handleCreate(formData: FormData) {
    // Mock create
    console.log("Mock create conge:", {
      emp_id: employee?.id_emp || 0,
      type: formData.get("type") as "Annuel" | "Maladie" | "Maternite" | "Exceptionnel",
      date_debut: formData.get("date_debut") as string,
      date_fin: formData.get("date_fin") as string,
      statut: "En attente",
      valideur_id: employee?.manager_id || null,
      solde_restant: 30,
    })
    setDialogOpen(false)
    setDialogOpen(false)
  }

  function handleApprove(id: number) {
    console.log("Mock approve conge:", id)
  }

  function handleRefuse(id: number) {
    console.log("Mock refuse conge:", id)
  }

  const canApprove = role === "Manager" || role === "HR"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conges</h1>
          <p className="text-muted-foreground">Gestion des demandes de conge</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Nouvelle demande</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Demande de Conge</DialogTitle>
              <DialogDescription>Soumettez votre demande de conge</DialogDescription>
            </DialogHeader>
            <form action={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type de conge</Label>
                <select id="type" name="type" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" required>
                  <option value="Annuel">Annuel</option>
                  <option value="Maladie">Maladie</option>
                  <option value="Maternite">Maternite</option>
                  <option value="Exceptionnel">Exceptionnel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_debut">Date de debut</Label>
                  <Input id="date_debut" name="date_debut" type="date" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date_fin">Date de fin</Label>
                  <Input id="date_fin" name="date_fin" type="date" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Soumettre</Button>
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
          <Select value={statutFilter} onValueChange={setStatutFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Approuve">Approuve</SelectItem>
              <SelectItem value="Refuse">Refuse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employe</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Du</TableHead>
                <TableHead className="hidden md:table-cell">Au</TableHead>
                <TableHead>Duree</TableHead>
                <TableHead>Statut</TableHead>
                {canApprove && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => {
                const emp = employeesList.find((e) => e.id_emp === c.emp_id)
                const debut = new Date(c.date_debut)
                const fin = new Date(c.date_fin)
                const jours = Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)) + 1
                return (
                  <TableRow key={c.id_conge}>
                    <TableCell className="font-medium">{emp ? `${emp.first_name} ${emp.last_name}` : "Inconnu"}</TableCell>
                    <TableCell className="text-sm">{c.type}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{debut.toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{fin.toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="text-sm">{jours} jour{jours > 1 ? "s" : ""}</TableCell>
                    <TableCell><StatusBadge status={c.statut} /></TableCell>
                    {canApprove && (
                      <TableCell>
                        {c.statut === "En attente" && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600" onClick={() => handleApprove(c.id_conge)}>
                              <Check className="h-3.5 w-3.5" />
                              <span className="sr-only">Approuver</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleRefuse(c.id_conge)}>
                              <X className="h-3.5 w-3.5" />
                              <span className="sr-only">Refuser</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={canApprove ? 7 : 6} className="h-24 text-center text-muted-foreground">Aucune demande trouvee</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
