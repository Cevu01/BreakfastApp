export function getUserDay(startDateStr: string): number {
  const start = new Date(startDateStr);
  const today = new Date();

  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diff + 1; // Day 1 is the day they started
}
