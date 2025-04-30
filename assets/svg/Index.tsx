// src/assets/svg/index.ts
import Potato from "./Potato";
import Pepper from "./Pepper";
import Onion from "./Onion";
import Paprika from "./Paprika";

export const IngredientIcons = {
  potato: Potato,
  pepper: Pepper,
  onion: Onion,
  paprika: Paprika,
} as const;

// Helper type
export type IngredientName = keyof typeof IngredientIcons;
