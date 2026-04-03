export function LegalFooter() {
  return (
    <footer className="shrink-0 border-t border-border bg-background px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground md:justify-between">
        <span className="text-center md:text-left">© {new Date().getFullYear()} neom</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href="/legal/impressum.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
          >
            Impressum (PDF)
          </a>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <a
            href="/legal/datenschutz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
          >
            Datenschutzerklärung (PDF)
          </a>
        </nav>
      </div>
    </footer>
  )
}
