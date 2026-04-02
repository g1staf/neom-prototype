"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { TrendingUpIcon, ActivityIcon, InfoIcon, TriangleAlertIcon, CircleCheckIcon } from "lucide-react"

import { PageTransition } from "@/components/motion/page-transition"
import { ClientOnly } from "@/components/client-only"
import { revenueHistory, programme } from "@/lib/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "percent", maximumFractionDigits: 1 }).format(value / 100)
}

function churnBadgeVariant(churnRate: number) {
  if (churnRate < 3) return "bg-green-50 text-green-700 border-green-200"
  if (churnRate <= 5) return "bg-amber-50 text-amber-700 border-amber-200"
  return "bg-red-50 text-red-700 border-red-200"
}

const activityFeed = [
  { type: "success", text: "Thomas Weber hat Q1‑Termin wahrgenommen", when: "vor 2 Tagen" },
  { type: "info", text: "Maria Schmidt hat sich für Herz‑Basis‑Check enrolled", when: "vor 5 Tagen" },
  { type: "warning", text: "Frank Becker — Zahlung überfällig (Mahnung gesendet)", when: "vor 3 Tagen" },
  { type: "info", text: "Sabine Müller — nächster Termin automatisch gebucht: 18.04.", when: "vor 1 Woche" },
  { type: "danger", text: "Jürgen Hoffmann hat Programm pausiert", when: "vor 1 Woche" },
] as const

function ActivityIconForType({ type }: { type: (typeof activityFeed)[number]["type"] }) {
  if (type === "success") return <CircleCheckIcon className="size-4 text-green-600" />
  if (type === "warning") return <TriangleAlertIcon className="size-4 text-amber-600" />
  if (type === "danger") return <ActivityIcon className="size-4 text-red-600" />
  return <InfoIcon className="size-4 text-primary" />
}

export default function PraxisDashboardPage() {
  const [range, setRange] = React.useState("30")
  const aktive = programme.filter((p) => p.status === "aktiv")
  const entwurfCount = programme.filter((p) => p.status === "entwurf").length

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Übersicht über Umsatz, Teilnehmer und Programm‑Performance.
            </p>
          </div>
          <div className="w-full md:w-[220px]">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger>
                <SelectValue placeholder="Zeitraum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Letzte 30 Tage</SelectItem>
                <SelectItem value="90">Letzte 90 Tage</SelectItem>
                <SelectItem value="year">Dieses Jahr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Recurring Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">{formatEUR(6911)}</div>
              <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
                <TrendingUpIcon className="size-4" />
                +18,4% vs. Vormonat
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktive Teilnehmer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">129</div>
              <div className="mt-1 text-sm text-muted-foreground">+22 vs. Vormonat</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktive Programme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">{aktive.length}</div>
              <div className="mt-1 text-sm text-muted-foreground">{entwurfCount} Entwurf</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ø Umsatz / Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">€53,57 / Monat</div>
              <div className="mt-1 text-sm text-muted-foreground">+4,2% vs. Vormonat</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Umsatzentwicklung</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientOnly>
              <div className="h-[300px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueHistory} margin={{ left: 6, right: 16, top: 6, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1447e6" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#1447e6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.35)" />
                    <XAxis
                      dataKey="monat"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      tickFormatter={(v) => `€${v}`}
                      width={48}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
                      }}
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      formatter={(value: unknown, name: unknown) => {
                        if (name === "mrr") return [formatEUR(Number(value)), "MRR"]
                        if (name === "teilnehmer") return [String(value), "Teilnehmer"]
                        return [String(value), String(name)]
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mrr"
                      stroke="#1447e6"
                      strokeWidth={2}
                      fill="url(#mrrFill)"
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ClientOnly>
            <div className="mt-3 text-xs text-muted-foreground">
              Zeitraum:{" "}
              <span className="font-medium text-foreground/80">
                {range === "30" ? "Letzte 30 Tage" : range === "90" ? "Letzte 90 Tage" : "Dieses Jahr"}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Programme — Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aktive.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        <span className="font-medium text-foreground/80 tabular-nums">{p.teilnehmer}</span>{" "}
                        Teilnehmer
                      </span>
                      <span className="hidden h-3 w-px bg-border md:block" />
                      <span>
                        MRR{" "}
                        <span className="font-medium text-foreground/80 tabular-nums">
                          {formatEUR(p.mrr)}
                        </span>
                      </span>
                      <span className="hidden h-3 w-px bg-border md:block" />
                      <span>
                        Churn{" "}
                        <span className="font-medium text-foreground/80 tabular-nums">
                          {formatPercent(p.churnRate)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("shrink-0", churnBadgeVariant(p.churnRate))}>
                    {p.churnRate < 3 ? "Stabil" : p.churnRate <= 5 ? "Beobachten" : "Kritisch"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Letzte Aktivitäten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityFeed.map((e, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-secondary">
                    <ActivityIconForType type={e.type} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-foreground/90">{e.text}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{e.when}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}

