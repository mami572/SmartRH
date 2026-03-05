import { query } from "./mysql"
import type {
  Grade,
  Employee,
  User,
  BulletinPaie,
  Conge,
  Formation,
} from "./types"

// ── Grades ──────────────────────────────────────────────
export async function getAllGrades(): Promise<Grade[]> {
  return query<Grade>("SELECT * FROM grades")
}
export async function getGradeById(id: number): Promise<Grade | undefined> {
  const rows = await query<Grade>("SELECT * FROM grades WHERE id_grade = ?", [id])
  return rows[0]
}
export async function createGrade(data: Omit<Grade, "id_grade">): Promise<number> {
  const result: any = await query("INSERT INTO grades (grade_name, description, salary_base, bonus) VALUES (?, ?, ?, ?)", 
    [data.grade_name, data.description, data.salary_base, data.bonus])
  return result.insertId
}
export async function updateGrade(id: number, data: Partial<Grade>): Promise<boolean> {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(", ")
  const values = Object.values(data)
  const result: any = await query(`UPDATE grades SET ${fields} WHERE id_grade = ?`, [...values, id])
  return result.affectedRows > 0
}
export async function deleteGrade(id: number): Promise<boolean> {
  const result: any = await query("DELETE FROM grades WHERE id_grade = ?", [id])
  return result.affectedRows > 0
}

// ── Employees ───────────────────────────────────────────
export async function getAllEmployees(): Promise<Employee[]> {
  return query<Employee>("SELECT * FROM employees")
}
export async function getEmployeeById(id: number): Promise<Employee | undefined> {
  const rows = await query<Employee>("SELECT * FROM employees WHERE id_emp = ?", [id])
  return rows[0]
}
export async function createEmployee(data: Omit<Employee, "id_emp">): Promise<number> {
  const result: any = await query(
    "INSERT INTO employees (first_name, last_name, date_birth, date_hire, grade_id, manager_id, salary_base, status, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [data.first_name, data.last_name, data.date_birth, data.date_hire, data.grade_id, data.manager_id, data.salary_base, data.status, data.phone, data.address]
  )
  return result.insertId
}
export async function updateEmployee(id: number, data: Partial<Employee>): Promise<boolean> {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(", ")
  const values = Object.values(data)
  const result: any = await query(`UPDATE employees SET ${fields} WHERE id_emp = ?`, [...values, id])
  return result.affectedRows > 0
}
export async function deleteEmployee(id: number): Promise<boolean> {
  const result: any = await query("DELETE FROM employees WHERE id_emp = ?", [id])
  return result.affectedRows > 0
}

// ── Users ───────────────────────────────────────────────
export async function getAllUsers(): Promise<User[]> {
  return query<User>("SELECT * FROM users")
}
export async function getUserById(id: number): Promise<User | undefined> {
  const rows = await query<User>("SELECT * FROM users WHERE id_user = ?", [id])
  return rows[0]
}
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const rows = await query<User>("SELECT * FROM users WHERE email = ?", [email])
  return rows[0]
}
export async function createUser(data: Omit<User, "id_user">): Promise<number> {
  const result: any = await query("INSERT INTO users (email, password_hash, role, emp_id) VALUES (?, ?, ?, ?)", 
    [data.email, data.password_hash, data.role, data.emp_id])
  return result.insertId
}
export async function updateUser(id: number, data: Partial<User>): Promise<boolean> {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(", ")
  const values = Object.values(data)
  const result: any = await query(`UPDATE users SET ${fields} WHERE id_user = ?`, [...values, id])
  return result.affectedRows > 0
}
export async function deleteUser(id: number): Promise<boolean> {
  const result: any = await query("DELETE FROM users WHERE id_user = ?", [id])
  return result.affectedRows > 0
}

// ── Bulletins de Paie ───────────────────────────────────
export async function getAllBulletins(): Promise<BulletinPaie[]> {
  return query<BulletinPaie>("SELECT * FROM bulletins_paie")
}
export async function getBulletinsByEmployee(empId: number): Promise<BulletinPaie[]> {
  return query<BulletinPaie>("SELECT * FROM bulletins_paie WHERE emp_id = ?", [empId])
}
export async function createBulletin(data: Omit<BulletinPaie, "id_bulletin">): Promise<number> {
  const result: any = await query(
    "INSERT INTO bulletins_paie (emp_id, mois, annee, salaire_brut, cotisations, primes, net_a_payer, date_generation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [data.emp_id, data.mois, data.annee, data.salaire_brut, data.cotisations, data.primes, data.net_a_payer, data.date_generation]
  )
  return result.insertId
}
export async function deleteBulletin(id: number): Promise<boolean> {
  const result: any = await query("DELETE FROM bulletins_paie WHERE id_bulletin = ?", [id])
  return result.affectedRows > 0
}

// ── Conges ──────────────────────────────────────────────
export async function getAllConges(): Promise<Conge[]> {
  return query<Conge>("SELECT * FROM conges")
}
export async function getCongesByEmployee(empId: number): Promise<Conge[]> {
  return query<Conge>("SELECT * FROM conges WHERE emp_id = ?", [empId])
}
export async function createConge(data: Omit<Conge, "id_conge">): Promise<number> {
  const result: any = await query(
    "INSERT INTO conges (emp_id, type, date_debut, date_fin, statut, valideur_id, solde_restant) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [data.emp_id, data.type, data.date_debut, data.date_fin, data.statut, data.valideur_id, data.solde_restant]
  )
  return result.insertId
}
export async function updateConge(id: number, data: Partial<Conge>): Promise<boolean> {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(", ")
  const values = Object.values(data)
  const result: any = await query(`UPDATE conges SET ${fields} WHERE id_conge = ?`, [...values, id])
  return result.affectedRows > 0
}

// ── Formations ──────────────────────────────────────────
export async function getAllFormations(): Promise<Formation[]> {
  const formations = await query<any>("SELECT * FROM formations")
  for (const f of formations) {
    const participants = await query<any>("SELECT emp_id FROM formation_participants WHERE formation_id = ?", [f.id_formation])
    f.participants = participants.map((p: any) => p.emp_id)
  }
  return formations as Formation[]
}
export async function getFormationById(id: number): Promise<Formation | undefined> {
  const rows = await query<any>("SELECT * FROM formations WHERE id_formation = ?", [id])
  if (rows.length === 0) return undefined
  const f = rows[0]
  const participants = await query<any>("SELECT emp_id FROM formation_participants WHERE formation_id = ?", [id])
  f.participants = participants.map((p: any) => p.emp_id)
  return f as Formation
}
export async function createFormation(data: Omit<Formation, "id_formation">): Promise<number> {
  const { participants, ...formationData } = data
  const result: any = await query(
    "INSERT INTO formations (nom, date_debut, date_fin, statut, cout) VALUES (?, ?, ?, ?, ?)",
    [formationData.nom, formationData.date_debut, formationData.date_fin, formationData.statut, formationData.cout]
  )
  const formationId = result.insertId
  if (participants && participants.length > 0) {
    for (const empId of participants) {
      await query("INSERT INTO formation_participants (formation_id, emp_id) VALUES (?, ?)", [formationId, empId])
    }
  }
  return formationId
}
export async function updateFormation(id: number, data: Partial<Formation>): Promise<boolean> {
  const { participants, ...formationData } = data
  let success = true
  if (Object.keys(formationData).length > 0) {
    const fields = Object.keys(formationData).map(key => `${key} = ?`).join(", ")
    const values = Object.values(formationData)
    const result: any = await query(`UPDATE formations SET ${fields} WHERE id_formation = ?`, [...values, id])
    success = result.affectedRows > 0
  }
  if (participants) {
    await query("DELETE FROM formation_participants WHERE formation_id = ?", [id])
    for (const empId of participants) {
      await query("INSERT INTO formation_participants (formation_id, emp_id) VALUES (?, ?)", [id, empId])
    }
  }
  return success
}

// Re-export types
export type { Grade, Employee, User, BulletinPaie, Conge, Formation } from "./types"
export type { EmployeeStatus, UserRole, CongeType, CongeStatut, FormationStatut } from "./types"
