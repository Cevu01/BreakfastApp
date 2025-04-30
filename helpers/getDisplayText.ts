import { formatQuantity } from "./formatQuantity"; // wherever you keep your formatQuantity

export function getDisplayText(obj: {
  quantity?: number;
  unit?: string;
}): string {
  const { quantity, unit } = obj;
  const qty = formatQuantity(quantity);
  if (!qty) return "";

  if (!unit) {
    return qty;
  }

  // if unit is 1–2 chars (g, kg, ml, oz, etc.), glue it on
  if (unit.length <= 2) {
    return `${qty}${unit}`;
  }

  // otherwise insert a space
  return `${qty} ${unit}`;
}
