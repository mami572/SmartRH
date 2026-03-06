import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Grades
  const gradeA1 = await prisma.grade.upsert({
    where: { id_grade: 1 },
    update: {},
    create: {
      id_grade: 1,
      grade_name: 'A1',
      description: 'Cadre supérieur',
      salary_base: 450000,
      bonus: 50000,
    },
  })

  const gradeB2 = await prisma.grade.upsert({
    where: { id_grade: 2 },
    update: {},
    create: {
      id_grade: 2,
      grade_name: 'B2',
      description: 'Technicien qualifié',
      salary_base: 250000,
      bonus: 20000,
    },
  })

  // Employees
  const emp1 = await prisma.employee.upsert({
    where: { id_emp: 1 },
    update: {},
    create: {
      id_emp: 1,
      first_name: 'Mohamed',
      last_name: 'Ould Ahmed',
      date_birth: new Date('1985-05-15'),
      date_hire: new Date('2020-01-10'),
      grade_id: 1,
      salary_base: 500000,
      status: 'Active',
      phone: '44556677',
      address: 'Tevragh Zeina, Nouakchott',
    },
  })

  // Users
  await prisma.user.upsert({
    where: { id_user: 1 },
    update: {},
    create: {
      id_user: 1,
      email: 'admin@smartrh.com',
      password_hash: '1234', // In real app, use bcrypt
      role: 'HR',
      emp_id: 1,
    },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
