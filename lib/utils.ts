export { cn } from "cn"

export function formatPrice(price: string | number, currency = "USD"): string {
  const amount = typeof price === "number" ? price : Number(price);
  if (!Number.isFinite(amount)) return "Price on request";

  const currencyCode = /^[A-Za-z]{3}$/.test(currency) ? currency.toUpperCase() : "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  }
}
