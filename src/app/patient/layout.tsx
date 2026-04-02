"use client"

import * as React from "react"

import { PageTransition } from "@/components/motion/page-transition"

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-8">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  )
}

