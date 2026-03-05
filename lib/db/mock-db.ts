import { 
  grades as initialGrades, 
  employees as initialEmployees, 
  users as initialUsers, 
  bulletinsPaie as initialBulletins, 
  conges as initialConges, 
  formations as initialFormations 
} from "./mock-data"
import type { Employee, User, Grade, BulletinPaie, Conge, Formation } from "./types"

class MockDB {
  private data: {
    grades: Grade[]
    employees: Employee[]
    users: User[]
    bulletins: BulletinPaie[]
    conges: Conge[]
    formations: Formation[]
  }

  private listeners: Set<() => void> = new Set()

  constructor() {
    this.data = {
      grades: initialGrades,
      employees: initialEmployees,
      users: initialUsers,
      bulletins: initialBulletins,
      conges: initialConges,
      formations: initialFormations,
    }
    
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartrh_mock_db")
      if (saved) {
        try {
          this.data = JSON.parse(saved)
        } catch (e) {
          console.error("Failed to load mock db", e)
        }
      }
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("smartrh_mock_db", JSON.stringify(this.data))
    }
    this.notify()
  }

  private notify() {
    this.listeners.forEach(l => l())
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getGrades() { return this.data.grades }
  getEmployees() { return this.data.employees }
  getUsers() { return this.data.users }
  getBulletins() { return this.data.bulletins }
  getConges() { return this.data.conges }
  getFormations() { return this.data.formations }

  addEmployee(emp: Omit<Employee, "id_emp">) {
    const id = Math.max(0, ...this.data.employees.map(e => e.id_emp)) + 1
    const newEmp = { ...emp, id_emp: id }
    this.data.employees = [...this.data.employees, newEmp]
    this.save()
    return newEmp
  }

  addUser(user: Omit<User, "id_user">) {
    const id = Math.max(0, ...this.data.users.map(u => u.id_user)) + 1
    const newUser = { ...user, id_user: id }
    this.data.users = [...this.data.users, newUser]
    this.save()
    return newUser
  }

  updateEmployee(id: number, updates: Partial<Employee>) {
    this.data.employees = this.data.employees.map(e => e.id_emp === id ? { ...e, ...updates } : e)
    this.save()
  }

  // Add more methods as needed...
}

export const mockDB = new MockDB()
