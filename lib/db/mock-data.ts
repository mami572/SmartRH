import type {
  Grade,
  Employee,
  User,
  BulletinPaie,
  Conge,
  Formation,
} from "./types"

// ── Grades ──────────────────────────────────────────────
export const grades: Grade[] = [
  { id_grade: 1, grade_name: "A1", description: "Cadre superieur", salary_base: 450000, bonus: 80000 },
  { id_grade: 2, grade_name: "A2", description: "Cadre", salary_base: 350000, bonus: 60000 },
  { id_grade: 3, grade_name: "B1", description: "Agent de maitrise senior", salary_base: 280000, bonus: 40000 },
  { id_grade: 4, grade_name: "B2", description: "Agent de maitrise", salary_base: 220000, bonus: 30000 },
  { id_grade: 5, grade_name: "C1", description: "Agent d'execution senior", salary_base: 170000, bonus: 20000 },
  { id_grade: 6, grade_name: "C2", description: "Agent d'execution", salary_base: 130000, bonus: 15000 },
]

// ── Employees ───────────────────────────────────────────
export const employees: Employee[] = [
  { id_emp: 1, first_name: "Mohamed", last_name: "Ould Ahmed", date_birth: "1975-03-15", date_hire: "2010-01-05", grade_id: 1, manager_id: null, salary_base: 450000, status: "Active", phone: "+222 22 33 44 55", address: "Nouakchott, Tevragh Zeina" },
  { id_emp: 2, first_name: "Fatima", last_name: "Mint Sidi", date_birth: "1980-07-22", date_hire: "2012-03-10", grade_id: 2, manager_id: 1, salary_base: 350000, status: "Active", phone: "+222 33 44 55 66", address: "Nouakchott, Ksar" },
  { id_emp: 3, first_name: "Aminata", last_name: "Ba", date_birth: "1985-11-08", date_hire: "2015-06-20", grade_id: 2, manager_id: 1, salary_base: 350000, status: "Active", phone: "+222 44 55 66 77", address: "Nouakchott, Sebkha" },
  { id_emp: 4, first_name: "Oumar", last_name: "Diallo", date_birth: "1990-02-14", date_hire: "2016-09-01", grade_id: 3, manager_id: 2, salary_base: 280000, status: "Active", phone: "+222 55 66 77 88", address: "Nouakchott, Dar Naim" },
  { id_emp: 5, first_name: "Mariem", last_name: "Mint Mohamed", date_birth: "1988-05-30", date_hire: "2017-02-15", grade_id: 3, manager_id: 2, salary_base: 280000, status: "Active", phone: "+222 66 77 88 99", address: "Nouakchott, Tevragh Zeina" },
  { id_emp: 6, first_name: "Ibrahima", last_name: "Sy", date_birth: "1992-09-12", date_hire: "2018-04-10", grade_id: 4, manager_id: 3, salary_base: 220000, status: "Active", phone: "+222 77 88 99 00", address: "Nouadhibou" },
  { id_emp: 7, first_name: "Aissata", last_name: "Camara", date_birth: "1995-01-25", date_hire: "2019-07-22", grade_id: 4, manager_id: 3, salary_base: 220000, status: "Active", phone: "+222 88 99 00 11", address: "Nouakchott, Arafat" },
  { id_emp: 8, first_name: "Sidi", last_name: "Ould Moulaye", date_birth: "1993-04-18", date_hire: "2020-01-08", grade_id: 5, manager_id: 2, salary_base: 170000, status: "Active", phone: "+222 99 00 11 22", address: "Nouakchott, El Mina" },
  { id_emp: 9, first_name: "Khadija", last_name: "Mint Abdallahi", date_birth: "1997-08-05", date_hire: "2021-03-15", grade_id: 5, manager_id: 3, salary_base: 170000, status: "Active", phone: "+222 00 11 22 33", address: "Nouakchott, Riyadh" },
  { id_emp: 10, first_name: "Moussa", last_name: "Kane", date_birth: "1998-12-20", date_hire: "2022-06-01", grade_id: 6, manager_id: 2, salary_base: 130000, status: "Active", phone: "+222 11 22 33 44", address: "Rosso" },
  { id_emp: 11, first_name: "Hawa", last_name: "Diop", date_birth: "1987-06-10", date_hire: "2014-11-20", grade_id: 3, manager_id: 1, salary_base: 280000, status: "Inactive", phone: "+222 22 44 66 88", address: "Kaedi" },
  { id_emp: 12, first_name: "Abdoulaye", last_name: "Toure", date_birth: "1991-10-03", date_hire: "2019-02-28", grade_id: 5, manager_id: 3, salary_base: 170000, status: "Active", phone: "+222 33 55 77 99", address: "Nouakchott, Toujounine" },
]

// ── Users ───────────────────────────────────────────────
export const users: User[] = [
  { id_user: 1, email: "m.ahmed@smartrh.mr", password_hash: "hashed", role: "HR", emp_id: 1 },
  { id_user: 2, email: "f.sidi@smartrh.mr", password_hash: "hashed", role: "Manager", emp_id: 2 },
  { id_user: 3, email: "a.ba@smartrh.mr", password_hash: "hashed", role: "Manager", emp_id: 3 },
  { id_user: 4, email: "o.diallo@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 4 },
  { id_user: 5, email: "m.mohamed@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 5 },
  { id_user: 6, email: "i.sy@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 6 },
  { id_user: 7, email: "a.camara@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 7 },
  { id_user: 8, email: "s.moulaye@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 8 },
  { id_user: 9, email: "k.abdallahi@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 9 },
  { id_user: 10, email: "m.kane@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 10 },
  { id_user: 11, email: "a.toure@smartrh.mr", password_hash: "hashed", role: "Employee", emp_id: 12 },
]

// ── Bulletins de Paie ───────────────────────────────────
export const bulletinsPaie: BulletinPaie[] = [
  { id_bulletin: 1, emp_id: 1, mois: 1, annee: 2026, salaire_brut: 530000, cotisations: 79500, primes: 80000, net_a_payer: 450500, date_generation: "2026-01-31" },
  { id_bulletin: 2, emp_id: 2, mois: 1, annee: 2026, salaire_brut: 410000, cotisations: 61500, primes: 60000, net_a_payer: 348500, date_generation: "2026-01-31" },
  { id_bulletin: 3, emp_id: 3, mois: 1, annee: 2026, salaire_brut: 410000, cotisations: 61500, primes: 60000, net_a_payer: 348500, date_generation: "2026-01-31" },
  { id_bulletin: 4, emp_id: 4, mois: 1, annee: 2026, salaire_brut: 320000, cotisations: 48000, primes: 40000, net_a_payer: 272000, date_generation: "2026-01-31" },
  { id_bulletin: 5, emp_id: 5, mois: 1, annee: 2026, salaire_brut: 320000, cotisations: 48000, primes: 40000, net_a_payer: 272000, date_generation: "2026-01-31" },
  { id_bulletin: 6, emp_id: 1, mois: 2, annee: 2026, salaire_brut: 530000, cotisations: 79500, primes: 80000, net_a_payer: 450500, date_generation: "2026-02-28" },
  { id_bulletin: 7, emp_id: 2, mois: 2, annee: 2026, salaire_brut: 410000, cotisations: 61500, primes: 60000, net_a_payer: 348500, date_generation: "2026-02-28" },
  { id_bulletin: 8, emp_id: 3, mois: 2, annee: 2026, salaire_brut: 410000, cotisations: 61500, primes: 60000, net_a_payer: 348500, date_generation: "2026-02-28" },
  { id_bulletin: 9, emp_id: 6, mois: 1, annee: 2026, salaire_brut: 250000, cotisations: 37500, primes: 30000, net_a_payer: 212500, date_generation: "2026-01-31" },
  { id_bulletin: 10, emp_id: 7, mois: 1, annee: 2026, salaire_brut: 250000, cotisations: 37500, primes: 30000, net_a_payer: 212500, date_generation: "2026-01-31" },
  { id_bulletin: 11, emp_id: 8, mois: 1, annee: 2026, salaire_brut: 190000, cotisations: 28500, primes: 20000, net_a_payer: 161500, date_generation: "2026-01-31" },
  { id_bulletin: 12, emp_id: 9, mois: 1, annee: 2026, salaire_brut: 190000, cotisations: 28500, primes: 20000, net_a_payer: 161500, date_generation: "2026-01-31" },
  { id_bulletin: 13, emp_id: 10, mois: 1, annee: 2026, salaire_brut: 145000, cotisations: 21750, primes: 15000, net_a_payer: 123250, date_generation: "2026-01-31" },
]

// ── Conges ───────────────────────────────────────────────
export const conges: Conge[] = [
  { id_conge: 1, emp_id: 4, type: "Annuel", date_debut: "2026-03-15", date_fin: "2026-03-25", statut: "En attente", valideur_id: 2, solde_restant: 22 },
  { id_conge: 2, emp_id: 5, type: "Maladie", date_debut: "2026-02-10", date_fin: "2026-02-14", statut: "Approuve", valideur_id: 2, solde_restant: 28 },
  { id_conge: 3, emp_id: 6, type: "Annuel", date_debut: "2026-04-01", date_fin: "2026-04-15", statut: "En attente", valideur_id: 3, solde_restant: 30 },
  { id_conge: 4, emp_id: 7, type: "Exceptionnel", date_debut: "2026-02-20", date_fin: "2026-02-22", statut: "Approuve", valideur_id: 3, solde_restant: 27 },
  { id_conge: 5, emp_id: 8, type: "Annuel", date_debut: "2026-05-10", date_fin: "2026-05-20", statut: "Refuse", valideur_id: 2, solde_restant: 30 },
  { id_conge: 6, emp_id: 2, type: "Annuel", date_debut: "2026-06-01", date_fin: "2026-06-10", statut: "En attente", valideur_id: 1, solde_restant: 25 },
  { id_conge: 7, emp_id: 9, type: "Maternite", date_debut: "2026-04-15", date_fin: "2026-07-15", statut: "Approuve", valideur_id: 3, solde_restant: 0 },
  { id_conge: 8, emp_id: 10, type: "Annuel", date_debut: "2026-03-20", date_fin: "2026-03-28", statut: "En attente", valideur_id: 2, solde_restant: 30 },
]

// ── Formations ──────────────────────────────────────────
export const formations: Formation[] = [
  { id_formation: 1, nom: "Leadership et Management", date_debut: "2026-03-01", date_fin: "2026-03-05", statut: "En cours", cout: 500000, participants: [2, 3, 11] },
  { id_formation: 2, nom: "Excel Avance", date_debut: "2026-04-10", date_fin: "2026-04-12", statut: "Planifiee", cout: 200000, participants: [4, 5, 6, 7] },
  { id_formation: 3, nom: "Droit du Travail Mauritanien", date_debut: "2026-02-01", date_fin: "2026-02-03", statut: "Terminee", cout: 350000, participants: [1, 2, 3] },
  { id_formation: 4, nom: "Gestion de Projet", date_debut: "2026-05-15", date_fin: "2026-05-20", statut: "Planifiee", cout: 450000, participants: [4, 5, 8, 9] },
  { id_formation: 5, nom: "Securite au Travail", date_debut: "2026-01-15", date_fin: "2026-01-16", statut: "Terminee", cout: 150000, participants: [6, 7, 8, 10, 12] },
  { id_formation: 6, nom: "Communication Professionnelle", date_debut: "2026-06-01", date_fin: "2026-06-03", statut: "Planifiee", cout: 280000, participants: [9, 10, 12] },
]
