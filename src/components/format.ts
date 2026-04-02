export function formatCurrencyEUR(
  value: number,
  opts?: { maximumFractionDigits?: number; minimumFractionDigits?: number }
) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: opts?.maximumFractionDigits ?? 0,
    minimumFractionDigits: opts?.minimumFractionDigits ?? 0,
  }).format(value)
}

export function formatNumberDE(value: number) {
  return new Intl.NumberFormat("de-DE").format(value)
}

