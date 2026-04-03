"use client"

import * as React from "react"

import { LegalFooter } from "@/components/legal-footer"
import { PageTransition } from "@/components/motion/page-transition"

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto w-full max-w-[1100px] flex-1 px-4 py-8 md:px-8">
        <PageTransition>{children}</PageTransition>
      </div>
      <LegalFooter />
    </div>
  )
}

