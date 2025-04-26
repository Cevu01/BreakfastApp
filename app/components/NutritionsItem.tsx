// NutritionItem.tsx
import React from "react";
import { View, Text } from "react-native";
import { SvgProps } from "react-native-svg";

interface Props {
  Icon: React.FC<SvgProps>;
  label: string;
  value: string | number;
}

const NutritionItem: React.FC<Props> = ({ Icon, label, value }) => (
  <View className="flex-col gap-2 bg-[rgba(213,212,212,0.815)] rounded-[16px] py-6 px-10 min-w-[100px] items-center">
    <Icon />
    <Text className="text-center font-fredokaRegular">{label}</Text>
    <Text className="text-center text-[18px] font-fredokaMedium">{value}g</Text>
  </View>
);

export default NutritionItem;
