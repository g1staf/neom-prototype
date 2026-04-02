"use client"

import * as React from "react"
import Link from "next/link"
import { MoreHorizontalIcon, PlusIcon, LinkIcon, PencilIcon } from "lucide-react"

import { programme } from "@/lib/dummy-data"
import { PageTransition } from "@/components/motion/page-transition"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
}

function statusBadge(status: string) {
  if (status === "aktiv") return "bg-green-50 text-green-700 border-green-200"
  if (status === "entwurf") return "bg-amber-50 text-amber-700 border-amber-200"
  return "bg-slate-50 text-slate-700 border-slate-200"
}

type Filter = "alle" | "aktiv" | "entwurf" | "archiviert"

export default function PraxisProgrammePage() {
  const [filter, setFilter] = React.useState<Filter>("alle")

  const filtered = programme.filter((p) => (filter === "alle" ? true : p.status === filter))
  const counts = {
    aktiv: programme.filter((p) => p.status === "aktiv").length,
    entwurf: programme.filter((p) => p.status === "entwurf").length,
    archiviert: programme.filter((p) => p.status === "archiviert").length,
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Programme</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Verwalten Sie Ihre Gesundheitsprogramme — aktiv, Entwürfe und Archiv.
            </p>
          </div>
          <Button asChild className="h-10 bg-primary text-primary-foreground hover:bg-[#1038c4]">
            <Link href="/praxis/programme/neu">
              <PlusIcon className="size-4" />
              Neues Programm erstellen
            </Link>
          </Button>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList>
            <TabsTrigger value="alle">Alle</TabsTrigger>
            <TabsTrigger value="aktiv">Aktiv ({counts.aktiv})</TabsTrigger>
            <TabsTrigger value="entwurf">Entwurf ({counts.entwurf})</TabsTrigger>
            <TabsTrigger value="archiviert">Archiviert ({counts.archiviert})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <CardHeader className="space-y-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate text-lg font-semibold">{p.name}</div>
                      <Badge variant="outline" className={cn(statusBadge(p.status))}>
                        {p.status === "aktiv" ? "Aktiv" : p.status === "entwurf" ? "Entwurf" : "Archiviert"}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{p.zielgruppe}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9" onClick={() => toast("Öffnet Editor (Dummy)")}>
                      <PencilIcon className="size-4" />
                      Bearbeiten
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9"
                      onClick={() => toast("Enrollment-Link kopiert (Dummy)")}
                    >
                      <LinkIcon className="size-4" />
                      Enrollment‑Link
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <MoreHorizontalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast("Programm dupliziert (Dummy)")}>
                          Duplizieren
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast("Programm archiviert (Dummy)")}>
                          Archivieren
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => toast("Programm gelöscht (Dummy)")}>
                          Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {p.status === "entwurf" ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-medium">Dieses Programm ist noch nicht aktiv.</div>
                        <div className="text-amber-800/80">
                          Aktivieren Sie es, um Patienten zu enrollen.
                        </div>
                      </div>
                      <Button
                        className="h-9 bg-primary text-primary-foreground hover:bg-[#1038c4]"
                        onClick={() => toast("Programm aktiviert (Dummy)")}
                      >
                        Jetzt aktivieren
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Teilnehmer</div>
                    <div className="mt-1 font-semibold tabular-nums">{p.teilnehmer}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">MRR</div>
                    <div className="mt-1 font-semibold tabular-nums">{formatEUR(p.mrr)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Preis</div>
                    <div className="mt-1 font-semibold tabular-nums">€{p.preis}/Monat</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Churn</div>
                    <div className="mt-1 font-semibold tabular-nums">{p.churnRate.toFixed(1)}%</div>
                  </div>
                </div>

                <Separator className="my-4" />

                <Collapsible>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Leistungen</div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="h-8 px-2 text-sm text-muted-foreground">
                        Anzeigen / ausblenden
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-3">
                    <div className="grid grid-cols-1 gap-2">
                      {p.leistungen.map((l, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 rounded-lg border border-border bg-white p-3 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="text-sm">
                            <span className="font-medium">{l.quartal}:</span> {l.name}
                          </div>
                          <div className="text-xs text-muted-foreground">GOÄ: {l.goae}</div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>

              <CardFooter className="border-t bg-secondary/30 py-3">
                <div className="text-xs text-muted-foreground">
                  Erstellt am{" "}
                  <span className="font-medium text-foreground/80 tabular-nums">{p.erstellt}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

