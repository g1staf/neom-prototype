"use client"

import * as React from "react"
import Link from "next/link"
import { CheckIcon, ShieldCheckIcon } from "lucide-react"
import { toast } from "sonner"

import { praxis, programme } from "@/lib/dummy-data"
import { formatCurrencyEUR } from "@/components/format"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function initials() {
  return "EH"
}

function activeProgramme() {
  return programme.filter((p) => p.status === "aktiv")
}

function calcErsparnis(einzelwert: number, preisMonat: number) {
  const jahrespreis = preisMonat * 12
  const pct = einzelwert > 0 ? Math.round(((einzelwert - jahrespreis) / einzelwert) * 100) : 0
  return { jahrespreis, pct: Math.max(0, Math.min(90, pct)) }
}

export default function PatientEnrollmentPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState({
    vorname: "",
    nachname: "",
    email: "",
    geburt: "",
    telefon: "",
    iban: "DE89 3704 0044 0532 0130 00",
    sepa: false,
    agb: false,
  })

  const progs = activeProgramme()
  const selected = selectedId ? progs.find((p) => p.id === selectedId) : null

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className="bg-accent text-primary font-semibold">{initials()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold tracking-tight">{praxis.name}</div>
            <div className="text-sm text-muted-foreground">
              {praxis.fachrichtung} · Heidelberg
            </div>
          </div>
        </div>

        <div className="max-w-2xl text-balance text-sm text-muted-foreground">
          Willkommen! Entdecken Sie unsere Gesundheitsprogramme und investieren Sie in Ihre Vorsorge. Wählen Sie das
          Programm, das zu Ihnen passt.
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheckIcon className="size-4 text-primary" />
          Vertrauenswürdig · transparente Leistungen · monatlich kündbar (Demo)
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {progs.map((p) => {
          const { jahrespreis, pct } = calcErsparnis(p.einzelwert, p.preis)
          return (
            <Card key={p.id} className="transition-shadow hover:shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="bg-accent text-primary border-primary/15">
                        {p.zielgruppe}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Preis</div>
                    <div className="text-2xl font-bold tracking-tight text-primary tabular-nums">
                      €{p.preis}
                    </div>
                    <div className="text-xs text-muted-foreground">/ Monat</div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Einzelleistungen wären {formatCurrencyEUR(p.einzelwert)} / Jahr — Sie sparen{" "}
                  <span className="font-medium text-foreground/80">{pct}%</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                {p.leistungen.slice(0, 5).map((l, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 grid size-5 place-items-center rounded-full bg-accent text-primary">
                      <CheckIcon className="size-3" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium">{l.quartal}:</span> {l.name}
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="h-11 w-full bg-primary text-primary-foreground hover:bg-[#1038c4]"
                      onClick={() => setSelectedId(p.id)}
                    >
                      Programm buchen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[640px]">
                    <DialogHeader>
                      <DialogTitle>Buchung</DialogTitle>
                    </DialogHeader>
                    {selected ? (
                      <div className="grid gap-4">
                        <div className="rounded-lg border border-border bg-secondary/30 p-4">
                          <div className="font-semibold">{selected.name}</div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {selected.zielgruppe} · €{selected.preis}/Monat
                          </div>
                          <div className="mt-3 grid gap-2">
                            {selected.leistungen.map((l, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckIcon className="mt-0.5 size-4 text-primary" />
                                <div className="min-w-0">
                                  <span className="font-medium text-foreground/80">{l.quartal}:</span> {l.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Vorname</Label>
                            <Input
                              value={form.vorname}
                              onChange={(e) => setForm((f) => ({ ...f, vorname: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Nachname</Label>
                            <Input
                              value={form.nachname}
                              onChange={(e) => setForm((f) => ({ ...f, nachname: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2 md:col-span-2">
                            <Label>E‑Mail</Label>
                            <Input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Geburtsdatum</Label>
                            <Input
                              type="date"
                              value={form.geburt}
                              onChange={(e) => setForm((f) => ({ ...f, geburt: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Telefon</Label>
                            <Input
                              value={form.telefon}
                              onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>Zahlungsmethode (SEPA, Demo)</Label>
                          <Input
                            value={form.iban}
                            onChange={(e) => setForm((f) => ({ ...f, iban: e.target.value }))}
                          />
                          <label className="mt-2 flex items-start gap-2 text-sm">
                            <Checkbox
                              checked={form.sepa}
                              onCheckedChange={(v) => setForm((f) => ({ ...f, sepa: Boolean(v) }))}
                              className="mt-0.5"
                            />
                            <span>Ich erteile ein SEPA‑Lastschriftmandat</span>
                          </label>
                        </div>

                        <label className="flex items-start gap-2 text-sm">
                          <Checkbox
                            checked={form.agb}
                            onCheckedChange={(v) => setForm((f) => ({ ...f, agb: Boolean(v) }))}
                            className="mt-0.5"
                          />
                          <span>Ich habe die Teilnahmebedingungen gelesen</span>
                        </label>
                      </div>
                    ) : null}

                    <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
                      <Button
                        className="h-11 w-full bg-primary text-primary-foreground hover:bg-[#1038c4] sm:w-auto"
                        onClick={() => {
                          console.log({ selectedId, form })
                          toast("Gebucht! (Dummy)")
                        }}
                        disabled={!selected || !form.sepa || !form.agb}
                      >
                        Kostenpflichtig buchen — €{selected?.preis ?? 0}/Monat
                      </Button>
                      <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                        <Link href="/patient/dashboard">Zu meinem Dashboard</Link>
                      </Button>
                    </DialogFooter>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Demo: Buchung speichert nichts persistent. Der Button aktiviert sich nach SEPA + Teilnahmebedingungen.
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="text-xs text-muted-foreground">
        Fragen? Kontaktieren Sie Ihre Praxis. Powered by Neoma (Prototype).
      </div>
    </div>
  )
}

