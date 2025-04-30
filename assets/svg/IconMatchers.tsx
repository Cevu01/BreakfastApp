// src/assets/svg/iconMatchers.ts
import { IngredientIcons, IngredientName } from "./IngredientsSvgs";

type Matcher = {
  key: IngredientName;
  matchers: string[];
};

/**
 * Ordered from most specific → most general
 */
export const iconMatchers: Matcher[] = [
  { key: "pepper", matchers: ["salt & pepper", "salt and pepper"] },
  { key: "pepper", matchers: ["pepper"] },
  { key: "paprika", matchers: ["paprika"] },
  { key: "potato", matchers: ["potato"] },
  { key: "onion", matchers: ["onion"] },
  { key: "chia", matchers: ["chia seeds", "chia"] },
  { key: "almond", matchers: ["almond milk", "almond"] },
  { key: "berries", matchers: ["mixed berries", "berries"] },
  { key: "syrup", matchers: ["maple syrup", "syrup"] },
  // once you add Milk.svg, add it here:
  // { key: "milk", matchers: ["milk"] },
];

/**
 * Try each matcher in order; return the first matching icon component.
 */
export function findIconByName(name: string) {
  const lower = name.toLowerCase().trim();
  for (const { key, matchers } of iconMatchers) {
    for (const phrase of matchers) {
      if (lower.includes(phrase)) {
        return IngredientIcons[key];
      }
    }
  }
  return undefined;
}
