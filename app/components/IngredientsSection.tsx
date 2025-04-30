// src/components/IngredientsSection.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  IngredientIcons,
  IngredientName,
} from "../../assets/svg/IngredientsSvgs";
import { findIconByName } from "../../assets/svg/IconMatchers";

export interface Ingredient {
  name: string;
  iconKey?: IngredientName;
  quantity?: number;
  unit?: string;
}

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

// helper: convert a number into a whole+fraction string (e.g. 1.5 -> "1 1/2", 0.5 -> "1/2")
function formatQuantity(q?: number): string {
  if (q == null) return "";
  const whole = Math.floor(q);
  const frac = q - whole;
  // check for near-integer
  if (Math.abs(frac) < 1e-6) {
    return `${whole}`;
  }

  const DEN = 100;
  let num = Math.round(frac * DEN);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(num, DEN);
  num /= g;
  const den = DEN / g;

  if (whole > 0) {
    return `${whole} ${num}/${den}`;
  }
  return `${num}/${den}`;
}

// helper: build the display text from quantity and unit; if no unit, just show the fraction/number
function getDisplayText(ing: Ingredient): string {
  const qty = formatQuantity(ing.quantity);
  if (!qty) return "";
  if (ing.unit) {
    return `${qty} ${ing.unit}`;
  }
  // no unit? just return the quantity (e.g. "1/2")
  return qty;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
}) => (
  <View className="flex-col gap-4">
    <Text className="text-[18px] font-fredokaMedium">Ingredients</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 16 }}
    >
      {ingredients.map((ing, idx) => {
        // 1) explicit iconKey override
        let Icon: React.ComponentType<SvgProps> | undefined =
          ing.iconKey && IngredientIcons[ing.iconKey];

        // 2) fallback to matcher-based lookup
        if (!Icon) {
          Icon = findIconByName(ing.name);
        }

        return (
          <View
            key={idx}
            className="bg-[rgba(213,212,212,0.815)] p-4 min-w-[150px] rounded-[14px] flex-col items-center gap-2"
          >
            {Icon ? (
              <Icon width={48} height={48} />
            ) : (
              <View className="w-12 h-12 bg-gray-300 rounded-full" />
            )}

            <Text className="text-center font-fredokaRegular">{ing.name}</Text>

            <Text className="text-center text-[18px] font-fredokaMedium">
              {getDisplayText(ing)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  </View>
);

export default IngredientsSection;
