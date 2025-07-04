// src/components/IngredientsSection.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  IngredientIcons,
  IngredientName,
} from "../../assets/svg/IngredientsSvgs";
import { findIconByName } from "../../assets/svg/IconMatchers";
import { getDisplayText } from "../../helpers/getDisplayText";
import { formatQuantity } from "../../helpers/formatQuantity"; // wherever you keep your formatQuantity
export interface Ingredient {
  name: string;
  iconKey?: IngredientName;
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
