export const praxis = {
  name: "Praxis Dr. med. Elisabeth Hartmann",
  fachrichtung: "Innere Medizin / Kardiologie",
  adresse: "Hauptstr. 42, 69117 Heidelberg",
  logo: null as null | string,
}

export type ProgrammStatus = "aktiv" | "entwurf" | "archiviert"

export type ProgrammLeistung = {
  quartal: string
  name: string
  goae?: string
}

export type Programm = {
  id: string
  name: string
  status: ProgrammStatus
  preis: number
  intervall: "monatlich"
  zielgruppe: string
  teilnehmer: number
  mrr: number
  churnRate: number
  erstellt: string
  leistungen: ProgrammLeistung[]
  einzelwert: number
}

export const programme: Programm[] = [
  {
    id: "prog-1",
    name: "Kardiovaskuläre Vorsorge Premium",
    status: "aktiv",
    preis: 79,
    intervall: "monatlich",
    zielgruppe: "Männer & Frauen ab 45",
    teilnehmer: 47,
    mrr: 3713,
    churnRate: 2.1,
    erstellt: "2026-01-15",
    leistungen: [
      { quartal: "Q1", name: "Großes Blutbild + Lipidprofil", goae: "3550" },
      { quartal: "Q2", name: "Belastungs-EKG", goae: "652" },
      {
        quartal: "Q3",
        name: "Großes Blutbild + HbA1c + Nierenwerte",
        goae: "3550, 3561",
      },
      { quartal: "Q4", name: "Internistischer Check-Up", goae: "6, 7, 8" },
      { quartal: "Jährlich", name: "Carotis-Duplex-Sonographie", goae: "410" },
    ],
    einzelwert: 1480,
  },
  {
    id: "prog-2",
    name: "Herz-Basis-Check",
    status: "aktiv",
    preis: 39,
    intervall: "monatlich",
    zielgruppe: "Erwachsene ab 35",
    teilnehmer: 82,
    mrr: 3198,
    churnRate: 1.8,
    erstellt: "2026-02-01",
    leistungen: [
      { quartal: "Halbjährlich", name: "Ruhe-EKG + Blutdruckprofil", goae: "651" },
      { quartal: "Jährlich", name: "Großes Blutbild + Lipidprofil", goae: "3550" },
      { quartal: "Jährlich", name: "Belastungs-EKG", goae: "652" },
    ],
    einzelwert: 680,
  },
  {
    id: "prog-3",
    name: "Diabetes-Prävention Plus",
    status: "entwurf",
    preis: 59,
    intervall: "monatlich",
    zielgruppe: "Risikopatienten, BMI >30, familiäre Vorbelastung",
    teilnehmer: 0,
    mrr: 0,
    churnRate: 0,
    erstellt: "2026-03-28",
    leistungen: [
      { quartal: "Q1", name: "HbA1c + Nüchternglukose + OGTT", goae: "3561, 3560" },
      { quartal: "Q2", name: "Nierenfunktion + Mikroalbumin", goae: "3585" },
      { quartal: "Q3", name: "HbA1c + Lipidprofil", goae: "3561, 3550" },
      {
        quartal: "Q4",
        name: "Internistischer Check-Up + Fußuntersuchung",
        goae: "6, 7, 8",
      },
    ],
    einzelwert: 920,
  },
]

export type PatientenStatus = "aktiv" | "pausiert" | "gekündigt"
export type Zahlungsstatus = "aktuell" | "überfällig" | "pausiert"

export type Patient = {
  id: string
  name: string
  alter: number
  programm: string
  status: PatientenStatus
  enrolledSeit: string
  naechsterTermin: string | null
  letzterTermin: string | null
  zahlungsstatus: Zahlungsstatus
}

export const patienten: Patient[] = [
  {
    id: "pat-1",
    name: "Thomas Weber",
    alter: 52,
    programm: "prog-1",
    status: "aktiv",
    enrolledSeit: "2026-01-20",
    naechsterTermin: "2026-04-15",
    letzterTermin: "2026-01-20",
    zahlungsstatus: "aktuell",
  },
  {
    id: "pat-2",
    name: "Sabine Müller",
    alter: 48,
    programm: "prog-1",
    status: "aktiv",
    enrolledSeit: "2026-01-22",
    naechsterTermin: "2026-04-18",
    letzterTermin: "2026-01-22",
    zahlungsstatus: "aktuell",
  },
  {
    id: "pat-3",
    name: "Klaus Richter",
    alter: 61,
    programm: "prog-1",
    status: "aktiv",
    enrolledSeit: "2026-02-05",
    naechsterTermin: "2026-05-02",
    letzterTermin: "2026-02-05",
    zahlungsstatus: "aktuell",
  },
  {
    id: "pat-4",
    name: "Maria Schmidt",
    alter: 44,
    programm: "prog-2",
    status: "aktiv",
    enrolledSeit: "2026-02-10",
    naechsterTermin: "2026-04-22",
    letzterTermin: "2026-02-10",
    zahlungsstatus: "aktuell",
  },
  {
    id: "pat-5",
    name: "Frank Becker",
    alter: 57,
    programm: "prog-1",
    status: "aktiv",
    enrolledSeit: "2026-02-15",
    naechsterTermin: "2026-05-10",
    letzterTermin: "2026-02-15",
    zahlungsstatus: "überfällig",
  },
  {
    id: "pat-6",
    name: "Andrea Fischer",
    alter: 39,
    programm: "prog-2",
    status: "aktiv",
    enrolledSeit: "2026-02-20",
    naechsterTermin: "2026-04-20",
    letzterTermin: "2026-02-20",
    zahlungsstatus: "aktuell",
  },
  {
    id: "pat-7",
    name: "Jürgen Hoffmann",
    alter: 63,
    programm: "prog-1",
    status: "pausiert",
    enrolledSeit: "2026-01-25",
    naechsterTermin: null,
    letzterTermin: "2026-02-25",
    zahlungsstatus: "pausiert",
  },
  {
    id: "pat-8",
    name: "Petra Wagner",
    alter: 51,
    programm: "prog-2",
    status: "aktiv",
    enrolledSeit: "2026-03-01",
    naechsterTermin: "2026-04-28",
    letzterTermin: "2026-03-01",
    zahlungsstatus: "aktuell",
  },
]

export const revenueHistory = [
  { monat: "Jan 26", mrr: 2844, teilnehmer: 36 },
  { monat: "Feb 26", mrr: 4580, teilnehmer: 62 },
  { monat: "Mär 26", mrr: 6120, teilnehmer: 89 },
  { monat: "Apr 26", mrr: 6911, teilnehmer: 129 },
]

export function getProgrammById(id: string) {
  return programme.find((p) => p.id === id)
}

export function getProgrammName(id: string) {
  return getProgrammById(id)?.name ?? "Unbekanntes Programm"
}

