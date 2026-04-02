"use client"

import * as React from "react"
import Link from "next/link"
import { PlusIcon, XIcon, SparklesIcon } from "lucide-react"
import { toast } from "sonner"

import { PageTransition } from "@/components/motion/page-transition"
import { formatCurrencyEUR } from "@/components/format"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Turnus = "Q1" | "Q2" | "Q3" | "Q4" | "Halbjährlich" | "Jährlich" | "Bei Bedarf"

type EditorLeistung = { id: string; turnus: Turnus; name: string; goae: string }

const fachrichtungen = [
  "Innere Medizin",
  "Gynäkologie",
  "Augenheilkunde",
  "Orthopädie",
  "Dermatologie",
  "Allgemeinmedizin",
] as const

function uid() {
  return Math.random().toString(16).slice(2)
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const templateByFachrichtung: Record<string, { label: string; apply: () => Partial<State> }[]> = {
  "Innere Medizin": [
    {
      label: "Kardiovaskuläre Vorsorge",
      apply: () => ({
        name: "Kardiovaskuläre Vorsorge Premium",
        zielgruppe: "Männer & Frauen ab 45",
        beschreibung:
          "Strukturiertes Vorsorgeprogramm für Herz‑ und Gefäßgesundheit mit automatischen Erinnerungen und planbarer Terminlogik.",
        preis: 79,
        einzelwert: 1480,
        leistungen: [
          { id: uid(), turnus: "Q1", name: "Großes Blutbild + Lipidprofil", goae: "3550" },
          { id: uid(), turnus: "Q2", name: "Belastungs‑EKG", goae: "652" },
          { id: uid(), turnus: "Q3", name: "Großes Blutbild + HbA1c + Nierenwerte", goae: "3550, 3561" },
          { id: uid(), turnus: "Q4", name: "Internistischer Check‑Up", goae: "6, 7, 8" },
          { id: uid(), turnus: "Jährlich", name: "Carotis‑Duplex‑Sonographie", goae: "410" },
        ],
      }),
    },
    {
      label: "Diabetes‑Prävention",
      apply: () => ({
        name: "Diabetes‑Prävention Plus",
        zielgruppe: "Risikopatienten, BMI >30, familiäre Vorbelastung",
        beschreibung:
          "Präventionsprogramm mit Quartals‑Checks, Laborwerten und automatischem Terminplan.",
        preis: 59,
        einzelwert: 920,
        leistungen: [
          { id: uid(), turnus: "Q1", name: "HbA1c + Nüchternglukose + OGTT", goae: "3561, 3560" },
          { id: uid(), turnus: "Q2", name: "Nierenfunktion + Mikroalbumin", goae: "3585" },
          { id: uid(), turnus: "Q3", name: "HbA1c + Lipidprofil", goae: "3561, 3550" },
          { id: uid(), turnus: "Q4", name: "Internistischer Check‑Up + Fußuntersuchung", goae: "6, 7, 8" },
        ],
      }),
    },
    {
      label: "Executive Check‑Up",
      apply: () => ({
        name: "Executive Check‑Up",
        zielgruppe: "Berufstätige ab 35 mit wenig Zeit",
        beschreibung:
          "Komprimierter Premium‑Check mit priorisierten Terminen und digitaler Nachverfolgung.",
        preis: 99,
        einzelwert: 1880,
        leistungen: [
          { id: uid(), turnus: "Halbjährlich", name: "Ruhe‑EKG + Blutdruckprofil", goae: "651" },
          { id: uid(), turnus: "Jährlich", name: "Großes Blutbild + Lipidprofil", goae: "3550" },
          { id: uid(), turnus: "Jährlich", name: "Belastungs‑EKG", goae: "652" },
        ],
      }),
    },
  ],
  Gynäkologie: [
    {
      label: "Frauen‑Vorsorge Premium",
      apply: () => ({
        name: "Frauen‑Vorsorge Premium",
        zielgruppe: "Frauen ab 30",
        beschreibung: "Vorsorgeprogramm mit Quartals‑Check‑Ins und jährlichem Screening.",
        preis: 59,
        einzelwert: 980,
        leistungen: [
          { id: uid(), turnus: "Q1", name: "Erweiterter Krebsabstrich + HPV‑Test", goae: "4006" },
          { id: uid(), turnus: "Q2", name: "Vaginal‑Ultraschall Gebärmutter + Eierstöcke", goae: "410" },
          { id: uid(), turnus: "Q3", name: "Brust‑Ultraschall", goae: "418" },
          { id: uid(), turnus: "Q4", name: "Großes Blutbild + Hormonstatus", goae: "3550" },
          { id: uid(), turnus: "Jährlich", name: "Haut‑Screening", goae: "29" },
        ],
      }),
    },
    {
      label: "Kinderwunsch‑Begleitung",
      apply: () => ({
        name: "Kinderwunsch‑Begleitung",
        zielgruppe: "Paare in der Kinderwunsch‑Phase",
        beschreibung: "Begleitprogramm mit Termin‑Rhythmus und digitaler Organisation.",
        preis: 79,
        einzelwert: 1240,
        leistungen: [
          { id: uid(), turnus: "Q1", name: "Anamnese + Zyklus‑Plan", goae: "1, 3" },
          { id: uid(), turnus: "Q2", name: "Hormonstatus + Beratung", goae: "3550" },
          { id: uid(), turnus: "Q3", name: "Follikel‑Monitoring (Ultraschall)", goae: "410" },
        ],
      }),
    },
    {
      label: "Menopause‑Programm",
      apply: () => ({
        name: "Menopause‑Programm",
        zielgruppe: "Frauen 45+",
        beschreibung: "Strukturiertes Programm mit quartalsweisen Checks & Symptom‑Tracking.",
        preis: 49,
        einzelwert: 760,
        leistungen: [
          { id: uid(), turnus: "Q1", name: "Beratung + Basis‑Labor", goae: "1, 3550" },
          { id: uid(), turnus: "Q2", name: "Ultraschall + Verlauf", goae: "410" },
          { id: uid(), turnus: "Q4", name: "Kontroll‑Check + Therapie‑Update", goae: "1, 3" },
        ],
      }),
    },
  ],
  Augenheilkunde: [
    {
      label: "Glaukom‑Vorsorge 360°",
      apply: () => ({
        name: "Augen‑Vorsorge 360°",
        zielgruppe: "Patienten ab 40",
        beschreibung: "Vorsorgeprogramm mit OCT, Funduskopie und Druckmessung.",
        preis: 49,
        einzelwert: 780,
        leistungen: [
          { id: uid(), turnus: "Halbjährlich", name: "Augeninnendruckmessung + Funduskopie", goae: "1256" },
          { id: uid(), turnus: "Jährlich", name: "OCT (Optische Kohärenztomographie)", goae: "424" },
          { id: uid(), turnus: "Jährlich", name: "Gesichtsfelduntersuchung", goae: "1236" },
          { id: uid(), turnus: "Bei Bedarf", name: "Hornhauttopographie", goae: "424" },
        ],
      }),
    },
    {
      label: "Makula‑Screening",
      apply: () => ({
        name: "Makula‑Screening",
        zielgruppe: "Patienten 55+",
        beschreibung: "Früherkennung durch regelmäßige OCT‑Kontrollen.",
        preis: 39,
        einzelwert: 620,
        leistungen: [
          { id: uid(), turnus: "Halbjährlich", name: "OCT‑Kontrolle", goae: "424" },
          { id: uid(), turnus: "Jährlich", name: "Funduskopie + Beratung", goae: "1256" },
        ],
      }),
    },
    {
      label: "Myopie‑Management",
      apply: () => ({
        name: "Myopie‑Management",
        zielgruppe: "Kinder & Jugendliche",
        beschreibung: "Monitoring, Verlaufskontrollen und individuelle Empfehlungen.",
        preis: 29,
        einzelwert: 420,
        leistungen: [
          { id: uid(), turnus: "Q2", name: "Refraktion + Achslängenmessung", goae: "" },
          { id: uid(), turnus: "Q4", name: "Kontrolltermin + Verlauf", goae: "" },
        ],
      }),
    },
  ],
}

type State = {
  name: string
  zielgruppe: string
  fachrichtung: string
  beschreibung: string
  leistungen: EditorLeistung[]
  preis: number
  einzelwert: number
  abrechnungsmodell: "all-in" | "service"
}

const defaultState: State = {
  name: "",
  zielgruppe: "",
  fachrichtung: "",
  beschreibung: "",
  leistungen: [
    { id: uid(), turnus: "Q1", name: "", goae: "" },
    { id: uid(), turnus: "Q2", name: "", goae: "" },
    { id: uid(), turnus: "Q3", name: "", goae: "" },
  ],
  preis: 79,
  einzelwert: 1480,
  abrechnungsmodell: "all-in",
}

function calcSavings({ preis, einzelwert }: { preis: number; einzelwert: number }) {
  const jahrespreis = preis * 12
  const ersparnis = einzelwert > 0 ? clamp(((einzelwert - jahrespreis) / einzelwert) * 100, 0, 90) : 0
  const marge = clamp(50 + (ersparnis / 100) * 30, 25, 85)
  return { jahrespreis, ersparnis: round1(ersparnis), marge: round1(marge) }
}

export default function PraxisProgrammNeuPage() {
  const [state, setState] = React.useState<State>(defaultState)

  const { jahrespreis, ersparnis, marge } = calcSavings({
    preis: Number(state.preis) || 0,
    einzelwert: Number(state.einzelwert) || 0,
  })

  const templates = state.fachrichtung ? templateByFachrichtung[state.fachrichtung] ?? [] : []

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              <Link href="/praxis/programme" className="hover:text-foreground">
                Programme
              </Link>{" "}
              <span className="mx-2 text-border">→</span> Neues Programm
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Neues Programm erstellen</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grundeinstellungen</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Programmname</Label>
                  <Input
                    placeholder="z.B. Kardiovaskuläre Vorsorge Premium"
                    value={state.name}
                    onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Zielgruppe</Label>
                  <Input
                    placeholder="z.B. Männer & Frauen ab 45"
                    value={state.zielgruppe}
                    onChange={(e) => setState((s) => ({ ...s, zielgruppe: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Fachrichtung</Label>
                  <Select
                    value={state.fachrichtung}
                    onValueChange={(v) => {
                      setState((s) => ({ ...s, fachrichtung: v }))
                      const starter = templateByFachrichtung[v]?.[0]?.apply()
                      if (starter) setState((s) => ({ ...s, ...starter, fachrichtung: v } as State))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen…" />
                    </SelectTrigger>
                    <SelectContent>
                      {fachrichtungen.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Beschreibung</Label>
                  <Textarea
                    rows={3}
                    placeholder="Kurze Beschreibung für Ihre Patienten…"
                    value={state.beschreibung}
                    onChange={(e) => setState((s) => ({ ...s, beschreibung: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Leistungen</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="text-sm text-muted-foreground">Enthaltene Leistungen</div>
                {state.leistungen.map((l) => (
                  <div key={l.id} className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 md:col-span-3">
                      <Select
                        value={l.turnus}
                        onValueChange={(v) =>
                          setState((s) => ({
                            ...s,
                            leistungen: s.leistungen.map((x) => (x.id === l.id ? { ...x, turnus: v as Turnus } : x)),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(["Q1", "Q2", "Q3", "Q4", "Halbjährlich", "Jährlich", "Bei Bedarf"] as const).map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        placeholder="Leistungsbezeichnung"
                        value={l.name}
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            leistungen: s.leistungen.map((x) => (x.id === l.id ? { ...x, name: e.target.value } : x)),
                          }))
                        }
                      />
                    </div>
                    <div className="col-span-10 md:col-span-2">
                      <Input
                        placeholder="GOÄ"
                        value={l.goae}
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            leistungen: s.leistungen.map((x) => (x.id === l.id ? { ...x, goae: e.target.value } : x)),
                          }))
                        }
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setState((s) => ({ ...s, leistungen: s.leistungen.filter((x) => x.id !== l.id) }))
                        }
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 justify-start"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      leistungen: [
                        ...s.leistungen,
                        { id: uid(), turnus: "Q1", name: "", goae: "" },
                      ],
                    }))
                  }
                >
                  <PlusIcon className="size-4" /> Leistung hinzufügen
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preis & Abrechnung</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Monatlicher Programmpreis</Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
                      €
                    </div>
                    <Input
                      type="number"
                      className="pl-7"
                      value={state.preis}
                      onChange={(e) => setState((s) => ({ ...s, preis: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jahrespreis für den Patienten</span>
                    <span className="font-semibold tabular-nums">{formatCurrencyEUR(jahrespreis)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Geschätzter Einzelleistungswert</span>
                    <span className="font-semibold tabular-nums">{formatCurrencyEUR(state.einzelwert)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ersparnis für den Patienten</span>
                    <span className="font-semibold tabular-nums">{ersparnis.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ihre geschätzte Marge</span>
                    <span className="font-semibold tabular-nums">~{marge.toFixed(1)}%</span>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label>Abrechnungsmodell</Label>
                  <RadioGroup
                    value={state.abrechnungsmodell}
                    onValueChange={(v) => setState((s) => ({ ...s, abrechnungsmodell: v as any }))}
                    className="gap-3"
                  >
                    <label className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <RadioGroupItem value="all-in" className="mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Programmgebühr deckt alle Leistungen</div>
                        <div className="text-xs text-muted-foreground">
                          Empfohlen für GKV‑Patienten / IGeL‑Programme
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <RadioGroupItem value="service" className="mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">
                          Programmgebühr als Servicepauschale + separate GOÄ‑Abrechnung
                        </div>
                        <div className="text-xs text-muted-foreground">Transparente Trennung von Service & Medizin</div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card className={cn("border-primary/20 bg-accent/40", !state.fachrichtung && "opacity-80")}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Oder starten Sie mit einer Vorlage</CardTitle>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  <SparklesIcon className="mr-1 size-3" /> KI‑Vorlagen (Dummy)
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {templates.length ? (
                  templates.map((t) => (
                    <Button
                      key={t.label}
                      variant="outline"
                      className="h-9 bg-white/60 hover:bg-white"
                      onClick={() => {
                        const patch = t.apply()
                        setState((s) => ({ ...s, ...patch } as State))
                        toast("Vorlage angewendet")
                      }}
                    >
                      {t.label}
                    </Button>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Wählen Sie zuerst eine Fachrichtung, um passende Vorlagen zu sehen.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="sticky bottom-4 z-10 flex gap-2 rounded-xl border border-border bg-white/80 p-3 shadow-sm backdrop-blur">
              <Button variant="outline" className="h-10 flex-1" onClick={() => toast("Als Entwurf gespeichert")}>
                Als Entwurf speichern
              </Button>
              <Button
                className="h-10 flex-1 bg-primary text-primary-foreground hover:bg-[#1038c4]"
                onClick={() => toast("Programm aktiviert (Dummy)")}
              >
                Programm aktivieren
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Live‑Vorschau</CardTitle>
                <div className="text-sm text-muted-foreground">So sehen Ihre Patienten dieses Programm.</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    {state.name?.trim() ? state.name : "Programmname"}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-accent text-primary border-primary/15">
                      {state.zielgruppe?.trim() ? state.zielgruppe : "Zielgruppe"}
                    </Badge>
                    {state.fachrichtung ? (
                      <Badge variant="outline" className="bg-white">
                        {state.fachrichtung}
                      </Badge>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="text-sm text-muted-foreground">Preis</div>
                  <div className="mt-1 text-3xl font-bold tracking-tight text-primary tabular-nums">
                    €{Number(state.preis) || 0} / Monat
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Einzelleistungen: {formatCurrencyEUR(state.einzelwert)} / Jahr →{" "}
                    <span className="font-medium text-foreground/80">
                      {formatCurrencyEUR(jahrespreis)} / Jahr
                    </span>
                  </div>
                </div>

                {state.beschreibung?.trim() ? (
                  <div className="text-sm text-muted-foreground">{state.beschreibung}</div>
                ) : null}

                <div className="space-y-2">
                  <div className="text-sm font-medium">Enthaltene Leistungen</div>
                  <div className="space-y-2">
                    {state.leistungen
                      .filter((l) => l.name.trim())
                      .map((l) => (
                        <div key={l.id} className="rounded-lg border border-border bg-white p-3 text-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span className="font-medium">{l.turnus}:</span> {l.name}
                            </div>
                            {l.goae?.trim() ? (
                              <span className="shrink-0 text-xs text-muted-foreground">GOÄ {l.goae}</span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    {!state.leistungen.some((l) => l.name.trim()) ? (
                      <div className="text-sm text-muted-foreground">
                        Fügen Sie links Leistungen hinzu, um die Vorschau zu füllen.
                      </div>
                    ) : null}
                  </div>
                </div>

                <Button className="h-11 w-full bg-primary text-primary-foreground hover:bg-[#1038c4]">
                  Programm buchen
                </Button>
                <div className="text-xs text-muted-foreground">
                  Demo: Button führt im Prototype später zur Buchung.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

