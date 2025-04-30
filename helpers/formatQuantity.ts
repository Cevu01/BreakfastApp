export function formatQuantity(q?: number): string {
  if (q == null) return "";
  const whole = Math.floor(q);
  const frac = q - whole;
  if (Math.abs(frac) < 1e-6) return `${whole}`;
  const DEN = 100;
  let num = Math.round(frac * DEN);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(num, DEN);
  num /= g;
  const den = DEN / g;
  return whole > 0 ? `${whole} ${num}/${den}` : `${num}/${den}`;
}
