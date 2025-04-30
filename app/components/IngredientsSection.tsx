// src/components/IngredientsSection.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import { IngredientIcons, IngredientName } from "../../assets/svg/Index";

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}

interface IngredientsSectionProps {
  ingredients: Ingredient[];
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
        const nameLower = ing.name.toLowerCase().trim();

        // Treat IngredientIcons as mapping to ComponentType<SvgProps>
        const iconMap = IngredientIcons as Record<
          string,
          React.ComponentType<SvgProps>
        >;

        // 1) direct match
        let Icon: React.ComponentType<SvgProps> | undefined =
          iconMap[nameLower];

        // 2) substring fallback
        if (!Icon) {
          const entry = Object.entries(iconMap).find(([key]) =>
            nameLower.includes(key)
          );
          if (entry) {
            Icon = entry[1];
          }
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
              {ing.quantity}
              {ing.unit}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  </View>
);

export default IngredientsSection;
