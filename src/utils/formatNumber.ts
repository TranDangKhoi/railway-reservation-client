export function formatCurrency(value: number | undefined) {
  if (typeof value === "number") return new Intl.NumberFormat("de-DE").format(value);
}
