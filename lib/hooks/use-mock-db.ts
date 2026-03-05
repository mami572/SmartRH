import { useState, useEffect } from "react"
import { mockDB } from "@/lib/db/mock-db"

export function useMockDb() {
  const [data, setData] = useState({
    grades: mockDB.getGrades(),
    employees: mockDB.getEmployees(),
    users: mockDB.getUsers(),
    bulletins: mockDB.getBulletins(),
    conges: mockDB.getConges(),
    formations: mockDB.getFormations(),
  })

  useEffect(() => {
    const unsubscribe = mockDB.subscribe(() => {
      setData({
        grades: mockDB.getGrades(),
        employees: mockDB.getEmployees(),
        users: mockDB.getUsers(),
        bulletins: mockDB.getBulletins(),
        conges: mockDB.getConges(),
        formations: mockDB.getFormations(),
      })
    })
    return () => { unsubscribe() }
  }, [])

  return {
    ...data,
    addEmployee: (emp: any) => mockDB.addEmployee(emp),
    addUser: (user: any) => mockDB.addUser(user),
    updateEmployee: (id: number, updates: any) => mockDB.updateEmployee(id, updates),
    // Add other mutators as needed
  }
}
