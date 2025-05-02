// src/assets/svg/index.ts
import Potato from "./Potato";
import Pepper from "./Pepper";
import Onion from "./Onion";
import Paprika from "./Paprika";
import AlmondMilk from "./AlmondMilk";
import ChiaSeeds from "./ChiaSeeds";
import MixedBerries from "./MixedBerries";
import MapleSyrup from "./MapleSyrup";
import Milk from "./Milk";
import Banana from "./Banana";
import CocoaPowder from "./CocoaPowder";
import SaltAndPepper from "./SaltAndPepper";

export const IngredientIcons = {
  potato: Potato,
  pepper: Pepper,
  onion: Onion,
  paprika: Paprika,
  almond: AlmondMilk,
  chia: ChiaSeeds,
  berries: MixedBerries,
  syrup: MapleSyrup,
  milk: Milk,
  banana: Banana,
  cocoa: CocoaPowder,
  saltpepper: SaltAndPepper,
} as const;

// Helper type
export type IngredientName = keyof typeof IngredientIcons;
