// TypeScript interfaces matching the MySQL schema for SmartRH Mauritanie

export type EmployeeStatus = "Active" | "Inactive"
export type UserRole = "Employee" | "Manager" | "HR"
export type CongeType = "Annuel" | "Maladie" | "Maternite" | "Exceptionnel"
export type CongeStatut = "En attente" | "Approuve" | "Refuse"
export type FormationStatut = "Planifiee" | "En cours" | "Terminee"

export interface Grade {
  id_grade: number
  grade_name: string
  description: string
  salary_base: number
  bonus: number
}

export interface Employee {
  id_emp: number
  first_name: string
  last_name: string
  date_birth: string
  date_hire: string
  grade_id: number
  manager_id: number | null
  salary_base: number
  status: EmployeeStatus
  phone?: string
  address?: string
}

export interface User {
  id_user: number
  email: string
  password_hash: string
  role: UserRole
  emp_id: number
}

export interface BulletinPaie {
  id_bulletin: number
  emp_id: number
  mois: number
  annee: number
  salaire_brut: number
  cotisations: number
  primes: number
  net_a_payer: number
  date_generation: string
}

export interface Conge {
  id_conge: number
  emp_id: number
  type: CongeType
  date_debut: string
  date_fin: string
  statut: CongeStatut
  valideur_id: number | null
  solde_restant: number
}

export interface Formation {
  id_formation: number
  nom: string
  date_debut: string
  date_fin: string
  statut: FormationStatut
  cout: number
  participants: number[]
}
