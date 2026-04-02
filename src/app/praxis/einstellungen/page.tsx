"use client"

import * as React from "react"
import { toast } from "sonner"

import { praxis } from "@/lib/dummy-data"
import { PageTransition } from "@/components/motion/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function PraxisEinstellungenPage() {
  const [name, setName] = React.useState(praxis.name)
  const [fach, setFach] = React.useState(praxis.fachrichtung)
  const [adresse, setAdresse] = React.useState(praxis.adresse)

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Einstellungen</h1>
          <p className="mt-1 text-sm text-muted-foreground">Praxis‑Einstellungen (Dummy).</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Praxisprofil</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Praxis‑Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Fachrichtung</Label>
              <Input value={fach} onChange={(e) => setFach(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Adresse</Label>
              <Input value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            </div>
            <Separator />
            <div className="flex flex-col gap-2 md:flex-row">
              <Button
                className="h-10 bg-primary text-primary-foreground hover:bg-[#1038c4]"
                onClick={() => {
                  console.log({ name, fach, adresse })
                  toast("Gespeichert!")
                }}
              >
                Speichern
              </Button>
              <Button variant="outline" className="h-10" onClick={() => toast("AV‑Vertrag anzeigen (Dummy)")}>
                AV‑Vertrag (Dummy)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}

