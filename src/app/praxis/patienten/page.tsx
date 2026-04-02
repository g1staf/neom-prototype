"use client"

import * as React from "react"
import { SearchIcon, MoreHorizontalIcon } from "lucide-react"
import { toast } from "sonner"

import { patienten, programme, getProgrammName } from "@/lib/dummy-data"
import { PageTransition } from "@/components/motion/page-transition"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Tab = "alle" | "aktiv" | "pausiert" | "ueberfaellig"

function statusBadge(status: string) {
  if (status === "aktiv") return "bg-green-50 text-green-700 border-green-200"
  if (status === "pausiert") return "bg-amber-50 text-amber-700 border-amber-200"
  return "bg-slate-50 text-slate-700 border-slate-200"
}

function paymentBadge(zahlungsstatus: string) {
  if (zahlungsstatus === "aktuell") return "bg-green-50 text-green-700 border-green-200"
  if (zahlungsstatus === "überfällig") return "bg-red-50 text-red-700 border-red-200"
  return "bg-amber-50 text-amber-700 border-amber-200"
}

export default function PraxisPatientenPage() {
  const [tab, setTab] = React.useState<Tab>("alle")
  const [search, setSearch] = React.useState("")
  const [programmFilter, setProgrammFilter] = React.useState<string>("all")

  const allProgramme = programme.filter((p) => p.status === "aktiv" || p.status === "entwurf")

  const filtered = patienten
    .filter((p) => {
      if (tab === "aktiv") return p.status === "aktiv"
      if (tab === "pausiert") return p.status === "pausiert"
      if (tab === "ueberfaellig") return p.zahlungsstatus === "überfällig"
      return true
    })
    .filter((p) => (programmFilter === "all" ? true : p.programm === programmFilter))
    .filter((p) => (search.trim() ? p.name.toLowerCase().includes(search.trim().toLowerCase()) : true))

  const counts = {
    alle: patienten.length,
    aktiv: patienten.filter((p) => p.status === "aktiv").length,
    pausiert: patienten.filter((p) => p.status === "pausiert").length,
    ueberfaellig: patienten.filter((p) => p.zahlungsstatus === "überfällig").length,
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patienten</h1>
            <p className="mt-1 text-sm text-muted-foreground">Alle enrollten Patienten und ihr Status.</p>
          </div>
          <div className="relative w-full md:w-[340px]">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Patient suchen…"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <TabsList>
              <TabsTrigger value="alle">Alle ({counts.alle})</TabsTrigger>
              <TabsTrigger value="aktiv">Aktiv ({counts.aktiv})</TabsTrigger>
              <TabsTrigger value="pausiert">Pausiert ({counts.pausiert})</TabsTrigger>
              <TabsTrigger value="ueberfaellig">Überfällig ({counts.ueberfaellig})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-full md:w-[260px]">
            <Select value={programmFilter} onValueChange={setProgrammFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Alle Programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Programme</SelectItem>
                {allProgramme.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Übersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Alter</TableHead>
                    <TableHead>Programm</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled seit</TableHead>
                    <TableHead>Nächster Termin</TableHead>
                    <TableHead>Zahlung</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="tabular-nums">{p.alter}</TableCell>
                      <TableCell className="max-w-[260px] truncate">{getProgrammName(p.programm)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(statusBadge(p.status))}>
                          {p.status === "aktiv" ? "Aktiv" : p.status === "pausiert" ? "Pausiert" : "Gekündigt"}
                        </Badge>
                      </TableCell>
                      <TableCell className="tabular-nums">{p.enrolledSeit}</TableCell>
                      <TableCell className="tabular-nums">{p.naechsterTermin ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(paymentBadge(p.zahlungsstatus))}>
                          {p.zahlungsstatus === "aktuell"
                            ? "✅ Aktuell"
                            : p.zahlungsstatus === "überfällig"
                              ? "⚠️ Überfällig"
                              : "⏸️ Pausiert"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                              <MoreHorizontalIcon className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast("Details (Dummy)")}>
                              Details ansehen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast("Nachricht gesendet (Dummy)")}>
                              Nachricht senden
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast("Termin gebucht (Dummy)")}>
                              Termin buchen
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast("Programm pausiert (Dummy)")}>
                              Programm pausieren
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => toast("Programm gekündigt (Dummy)")}>
                              Programm kündigen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}

