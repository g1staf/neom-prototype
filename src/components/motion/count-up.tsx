"use client"

import * as React from "react"
import { animate, useMotionValue, useTransform } from "framer-motion"

import { formatCurrencyEUR } from "@/components/format"

export function CountUpEUR({
  value,
  className,
  duration = 0.6,
}: {
  value: number
  className?: string
  duration?: number
}) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = React.useState(() => formatCurrencyEUR(value))

  React.useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: "easeOut" })
    const unsub = rounded.on("change", (v) => setDisplay(formatCurrencyEUR(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [motionValue, rounded, value, duration])

  return <div className={className}>{display}</div>
}

