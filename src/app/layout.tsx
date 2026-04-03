import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { LegalFooter } from "@/components/legal-footer"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "neom",
  description: "neom — SaaS-Prototyp für Gesundheitsprogramme",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${GeistSans.className} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <LegalFooter />
        <Toaster richColors />
      </body>
    </html>
  )
}
