import Link from "next/link"

export function LegalFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:justify-between">
        <span className="text-center md:text-left">© {new Date().getFullYear()} Neoma</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link
            href="/legal/impressum.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Impressum
          </Link>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <Link
            href="/legal/datenschutz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Datenschutzerklärung
          </Link>
        </nav>
      </div>
    </footer>
  )
}
