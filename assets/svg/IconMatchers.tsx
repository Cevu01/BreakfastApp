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
  { key: "almond", matchers: ["almond milk", "almond", "plant milk"] },
  { key: "berries", matchers: ["mixed berries", "berries"] },
  { key: "syrup", matchers: ["maple syrup", "syrup"] },
  { key: "milk", matchers: ["milk"] },
  { key: "banana", matchers: ["banana"] },
  { key: "cocoa", matchers: ["cocoa powder", "cocoa"] },
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
