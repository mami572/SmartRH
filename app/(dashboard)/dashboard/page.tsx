"use client"

import { useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { useMockDb } from "@/lib/hooks/use-mock-db"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Wallet, Calendar, GraduationCap } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Line, LineChart } from "recharts"

export default function DashboardPage() {
  const { role, employee } = useAuth()

  const { employees, bulletins, conges, formations, grades } = useMockDb()

  const stats = useMemo(() => {
    const allEmployees = employees
    const allBulletins = bulletins
    const allConges = conges
    const allFormations = formations
    const allGrades = grades

    const activeEmployees = allEmployees.filter((e) => e.status === "Active")
    const pendingConges = allConges.filter((c) => c.statut === "En attente")
    const activeFormations = allFormations.filter((f) => f.statut === "En cours")

    // Masse salariale from latest month bulletins
    const latestBulletins = allBulletins.filter((b) => b.mois === 1 && b.annee === 2026)
    const masseSalariale = latestBulletins.reduce((sum, b) => sum + b.net_a_payer, 0)

    // Grade distribution
    const gradeDistribution = allGrades.map((g) => ({
      name: g.grade_name,
      employes: allEmployees.filter((e) => e.grade_id === g.id_grade && e.status === "Active").length,
    }))

    // Monthly payroll evolution (simulated data)
    const payrollEvolution = [
      { mois: "Oct", montant: 2850000 },
      { mois: "Nov", montant: 2920000 },
      { mois: "Dec", montant: 3100000 },
      { mois: "Jan", montant: masseSalariale || 3062700 },
      { mois: "Fev", montant: 2990000 },
      { mois: "Mar", montant: 3050000 },
    ]

    // Recent activity
    const recentConges = allConges.slice(0, 5)

    return {
      totalEmployees: allEmployees.length,
      activeEmployees: activeEmployees.length,
      masseSalariale,
      pendingConges: pendingConges.length,
      activeFormations: activeFormations.length,
      gradeDistribution,
      payrollEvolution,
      recentConges,
      allEmployees,
    }
  }, [])

  // For Employee role, show personal stats
  if (role === "Employee") {
    const myConges = conges.filter((c) => c.emp_id === employee?.id_emp)
    const myBulletins = bulletins.filter((b) => b.emp_id === employee?.id_emp)
    const myFormations = formations.filter((f) => f.participants.includes(employee?.id_emp || 0))
    const latestBulletin = myBulletins.sort((a, b) => b.annee - a.annee || b.mois - a.mois)[0]

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Bienvenue, {employee?.first_name}
          </h1>
          <p className="text-muted-foreground">Voici un resume de votre situation</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Solde Conges" value={myConges[0]?.solde_restant ?? 30} description="jours restants" icon={Calendar} />
          <StatCard title="Dernier Salaire" value={latestBulletin ? `${latestBulletin.net_a_payer.toLocaleString("fr-FR")} MRU` : "N/A"} icon={Wallet} />
          <StatCard title="Demandes de Conge" value={myConges.length} description={`${myConges.filter(c => c.statut === "En attente").length} en attente`} icon={Calendar} />
          <StatCard title="Formations" value={myFormations.length} description="inscrit(e)" icon={GraduationCap} />
        </div>
      </div>
    )
  }

  // Manager / HR dashboard
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d{"'"}ensemble des ressources humaines
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employes"
          value={stats.totalEmployees}
          description={`${stats.activeEmployees} actifs`}
          icon={Users}
          trend={{ value: 8, label: "vs. trimestre dernier" }}
        />
        <StatCard
          title="Masse Salariale"
          value={`${(stats.masseSalariale / 1000).toFixed(0)}K`}
          description="MRU / mois"
          icon={Wallet}
          trend={{ value: 2.5, label: "vs. mois dernier" }}
        />
        <StatCard
          title="Conges en Attente"
          value={stats.pendingConges}
          description="a valider"
          icon={Calendar}
        />
        <StatCard
          title="Formations en Cours"
          value={stats.activeFormations}
          description="sessions actives"
          icon={GraduationCap}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Repartition par Grade</CardTitle>
            <CardDescription>Nombre d{"'"}employes actifs par grade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.gradeDistribution} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: "13px" }}
                  labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                />
                <Bar dataKey="employes" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Employes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Evolution Masse Salariale</CardTitle>
            <CardDescription>Sur les 6 derniers mois (MRU)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stats.payrollEvolution} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mois" className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: "13px" }}
                  labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                  formatter={(value: number) => [`${value.toLocaleString("fr-FR")} MRU`, "Montant"]}
                />
                <Line type="monotone" dataKey="montant" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-chart-2)" }} name="Montant" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Demandes de Conge Recentes</CardTitle>
          <CardDescription>Dernieres demandes soumises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {stats.recentConges.map((conge) => {
              const emp = stats.allEmployees.find((e) => e.id_emp === conge.emp_id)
              return (
                <div key={conge.id_conge} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {emp ? `${emp.first_name} ${emp.last_name}` : "Inconnu"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {conge.type} - Du {new Date(conge.date_debut).toLocaleDateString("fr-FR")} au {new Date(conge.date_fin).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <StatusBadge status={conge.statut} />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
