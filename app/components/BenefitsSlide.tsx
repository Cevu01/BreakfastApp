import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import type { OnboardingIllustrationData } from "@/data/data";

type Props = {
  item: OnboardingIllustrationData;
};

export default function BenefitsSlide({ item }: Props) {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{ width, backgroundColor: item.backgroundColor }}
      className="flex-1 pt-[34px] pb-[120px] px-[16px] items-center justify-around"
    >
      <Text
        className="text-[36px] font-fredokaMedium pb-2"
        style={{ color: item.textColor }}
      >
        {item.title}
      </Text>
      <item.component width={width * 0.9} height={width * 0.9} />
      <Text
        className="text-[24px] font-fredokaMedium text-center"
        style={{ color: item.textColor }}
      >
        {item.text}
      </Text>
    </View>
  );
}
