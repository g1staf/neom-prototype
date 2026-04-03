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
      <body className="min-h-dvh min-h-screen bg-background text-foreground">
        {/* pb: Platz für fixierte Fußzeile (Sonner-Toasts sitzen üblicherweise oben/unten rechts) */}
        <div className="flex min-h-dvh min-h-screen flex-col pb-[4.25rem]">{children}</div>
        <LegalFooter />
        <Toaster richColors />
      </body>
    </html>
  )
}
