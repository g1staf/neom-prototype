"use client"

import * as React from "react"
import { CalendarIcon, LogOutIcon, CheckCircle2Icon, CircleIcon, DotIcon, ClockIcon } from "lucide-react"
import { toast } from "sonner"

import { praxis, programme, patienten, getProgrammById } from "@/lib/dummy-data"
import { formatCurrencyEUR } from "@/components/format"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
}

export default function PatientDashboardPage() {
  const patient = patienten.find((p) => p.id === "pat-1")!
  const prog = getProgrammById(patient.programm) ?? programme[0]

  const progressValue = 25
  const next = {
    datum: "Dienstag, 15. April 2026 um 10:30 Uhr",
    leistung: "Q2 — Belastungs‑EKG",
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm text-muted-foreground">{praxis.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {praxis.fachrichtung} · {praxis.adresse}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-accent text-primary font-semibold">
              {initials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="text-sm font-medium">{patient.name}</div>
            <button
              className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => toast("Logout (Dummy)")}
            >
              <LogOutIcon className="size-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Hallo {patient.name.split(" ")[0]} 👋</h1>
        <div className="text-sm text-muted-foreground">
          Ihr Programm: <span className="font-medium text-foreground/85">{prog.name}</span>
        </div>
        <Badge variant="outline" className="w-fit bg-accent text-primary border-primary/15">
          Aktiv seit {patient.enrolledSeit}
        </Badge>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-primary/15 bg-accent/35">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarIcon className="size-4 text-primary" /> Ihr nächster Termin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-lg font-semibold">{next.datum}</div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">{next.leistung}</span>
            </div>
            <div className="text-sm text-muted-foreground">{praxis.adresse}</div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Button variant="outline" className="h-10" onClick={() => toast("Kalender‑Export (Dummy)")}>
                Im Kalender speichern
              </Button>
              <Button variant="ghost" className="h-10 justify-start text-primary" onClick={() => toast("Verschieben (Dummy)")}>
                Termin verschieben
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Programm‑Fortschritt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortschritt</span>
                <span className="font-medium tabular-nums">1 von 4 Quartalen</span>
              </div>
              <Progress value={progressValue} />
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2Icon className="mt-0.5 size-5 text-green-600" />
                <div className="text-sm">
                  <span className="font-medium">Q1:</span> Großes Blutbild + Lipidprofil —{" "}
                  <span className="text-muted-foreground tabular-nums">20.01.2026</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <DotIcon className="mt-0.5 size-6 text-primary" />
                <div className="text-sm">
                  <span className="font-medium">Q2:</span> Belastungs‑EKG —{" "}
                  <span className="text-muted-foreground">15.04.2026 (anstehend)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CircleIcon className="mt-1 size-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">Q3:</span> Großes Blutbild + HbA1c — geplant Q3 2026
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CircleIcon className="mt-1 size-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">Q4:</span> Internistischer Check‑Up — geplant Q4 2026
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 size-5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">Carotis‑Duplex:</span> geplant 2026
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Abo‑Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="text-xs text-muted-foreground">Programm</div>
            <div className="mt-1 font-medium">{prog.name}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Monatlicher Beitrag</div>
            <div className="mt-1 font-medium tabular-nums">
              {formatCurrencyEUR(prog.preis, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Zahlungsweise</div>
            <div className="mt-1 font-medium">SEPA‑Lastschrift (DE89 •••• 0130 00)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Nächste Abbuchung</div>
            <div className="mt-1 font-medium tabular-nums">01.05.2026</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-muted-foreground">Optionen</div>
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
              <Button variant="outline" className="h-10" onClick={() => toast("Zahlungsmethode ändern (Dummy)")}>
                Zahlungsmethode ändern
              </Button>
              <Button variant="outline" className="h-10" onClick={() => toast("Programm pausiert (Dummy)")}>
                Programm pausieren
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="text-xs text-muted-foreground">
        Fragen? Kontaktieren Sie Ihre Praxis: 06221 / 123 456
        <span className="mx-2 text-border">·</span>
        Powered by Neoma
      </footer>
    </div>
  )
}

