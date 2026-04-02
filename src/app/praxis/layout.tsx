"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  LayersIcon,
  UsersIcon,
  QrCodeIcon,
  SettingsIcon,
} from "lucide-react"

import { praxis } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/praxis/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/praxis/programme", label: "Programme", icon: LayersIcon },
  { href: "/praxis/patienten", label: "Patienten", icon: UsersIcon },
  { href: "/praxis/enrollment", label: "Enrollment-Portal", icon: QrCodeIcon },
  { href: "/praxis/einstellungen", label: "Einstellungen", icon: SettingsIcon },
] as const

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
}

export default function PraxisLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        <aside className="hidden w-[260px] shrink-0 border-r border-border bg-white p-4 md:block">
          <div className="flex flex-col gap-6">
            <div>
              <Link href="/praxis/dashboard" className="inline-flex items-center gap-2">
                <Image
                  src="/brand/neoma-logo.png"
                  alt="Neoma"
                  width={112}
                  height={28}
                  priority
                  className="h-7 w-auto"
                />
                <span className="sr-only">Neoma</span>
              </Link>
              <div className="mt-2 text-sm text-muted-foreground">
                <div className="truncate">{praxis.name}</div>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/praxis/dashboard" && pathname?.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className={cn(
                      "h-10 justify-start gap-2 rounded-lg px-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground",
                      isActive && "bg-accent text-primary hover:bg-accent font-medium"
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </nav>

            <div className="mt-auto flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-white text-sm font-semibold">
                  {getInitials("Elisabeth Hartmann")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Dr. E. Hartmann</div>
                <div className="truncate text-xs text-muted-foreground">Innere Medizin</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

