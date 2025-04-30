// src/assets/svg/index.ts
import Potato from "./Potato";
import Pepper from "./Pepper";
import Onion from "./Onion";
import Paprika from "./Paprika";
import AlmondMilk from "./AlmondMilk";
import ChiaSeeds from "./ChiaSeeds";
import MixedBerries from "./MixedBerries";
import MapleSyrup from "./MapleSyrup";

export const IngredientIcons = {
  potato: Potato,
  pepper: Pepper,
  onion: Onion,
  paprika: Paprika,
  almond: AlmondMilk,
  chia: ChiaSeeds,
  berries: MixedBerries,
  syrup: MapleSyrup,
} as const;

// Helper type
export type IngredientName = keyof typeof IngredientIcons;
