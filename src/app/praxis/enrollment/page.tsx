"use client"

import * as React from "react"
import Link from "next/link"
import { CopyIcon, QrCodeIcon, ExternalLinkIcon, PaletteIcon } from "lucide-react"
import { toast } from "sonner"

import { praxis } from "@/lib/dummy-data"
import { PageTransition } from "@/components/motion/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function PraxisEnrollmentPage() {
  const [praxisName, setPraxisName] = React.useState(praxis.name)
  const [welcome, setWelcome] = React.useState(
    "Willkommen in unserer Praxis. Entdecken Sie unsere Gesundheitsprogramme."
  )
  const [color, setColor] = React.useState("#1447e6")

  const link = "https://app.neom.de/p/dr-hartmann"

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Enrollment‑Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">So finden Ihre Patienten Ihre Programme.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Ihr Enrollment‑Link</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>URL</Label>
                <Input readOnly value={link} />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Button
                  className="h-10 bg-primary text-primary-foreground hover:bg-[#1038c4]"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(link)
                      toast("Link kopiert")
                    } catch {
                      toast("Kopieren nicht möglich (Dummy)")
                    }
                  }}
                >
                  <CopyIcon className="size-4" />
                  Link kopieren
                </Button>
                <Button variant="outline" className="h-10" onClick={() => toast("QR‑Code Download (Dummy)")}>
                  <QrCodeIcon className="size-4" />
                  QR‑Code herunterladen
                </Button>
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="text-sm font-medium">QR‑Code Vorschau</div>
                <div className="flex items-center gap-3">
                  <div className="grid size-28 place-items-center rounded-lg border border-border bg-secondary/40">
                    <div className="text-xs text-muted-foreground">QR</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Drucken Sie den QR‑Code aus und hängen Sie ihn im Wartezimmer auf.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Portal‑Vorschau</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
                <div className="font-medium text-foreground/90">Patienten‑Ansicht</div>
                <div className="mt-1">Öffnet das Enrollment‑Portal im Patienten‑Layout.</div>
              </div>
              <Button asChild className="h-10 bg-primary text-primary-foreground hover:bg-[#1038c4]">
                <Link href="/patient/enrollment" target="_blank">
                  <ExternalLinkIcon className="size-4" />
                  Vorschau öffnen
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground">Hinweis: In einem neuen Tab (Prototype).</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Anpassung</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Praxis‑Name</Label>
              <Input value={praxisName} onChange={(e) => setPraxisName(e.target.value)} />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>Willkommenstext</Label>
              <Textarea value={welcome} onChange={(e) => setWelcome(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <PaletteIcon className="size-4 text-muted-foreground" />
                Primärfarbe
              </Label>
              <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="bg-accent text-primary border-primary/15">
                  Default
                </Badge>
                {color !== "#1447e6" ? <span>Vorschau‑Farbe (Dummy): {color}</span> : <span>#1447e6</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground">
          Demo: Einstellungen speichern nicht persistent. In einem echten Produkt würden diese Werte ins Backend gehen.
        </div>
      </div>
    </PageTransition>
  )
}

