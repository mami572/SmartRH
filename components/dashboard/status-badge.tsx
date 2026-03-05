import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CongeStatut, FormationStatut, EmployeeStatus } from "@/lib/db/types"

type StatusType = CongeStatut | FormationStatut | EmployeeStatus

const statusConfig: Record<string, { className: string; label: string }> = {
  "Active": { className: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Actif" },
  "Inactive": { className: "bg-gray-50 text-gray-600 border-gray-200", label: "Inactif" },
  "En attente": { className: "bg-amber-50 text-amber-700 border-amber-200", label: "En attente" },
  "Approuve": { className: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Approuve" },
  "Refuse": { className: "bg-red-50 text-red-700 border-red-200", label: "Refuse" },
  "Planifiee": { className: "bg-sky-50 text-sky-700 border-sky-200", label: "Planifiee" },
  "En cours": { className: "bg-amber-50 text-amber-700 border-amber-200", label: "En cours" },
  "Terminee": { className: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Terminee" },
}

export function StatusBadge({ status, className: extraClass }: { status: StatusType; className?: string }) {
  const config = statusConfig[status] || { className: "", label: status }
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className, extraClass)}>
      {config.label}
    </Badge>
  )
}
