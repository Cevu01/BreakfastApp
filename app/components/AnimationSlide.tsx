import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import LottieView from "lottie-react-native";
import type { OnboardingAnimationData } from "@/data/data";

type Props = {
  item: OnboardingAnimationData;
  lottieStyle: any;
};

export default function AnimationSlide({ item, lottieStyle }: Props) {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{ width, backgroundColor: item.backgroundColor }}
      className="flex-1 pt-[90px] flex-col items-center px-[16px]"
    >
      <View className="absolute inset-0 justify-end items-center">
        <Animated.View
          style={[
            {
              width,
              height: width,
              borderRadius: width / 2,
              backgroundColor: item.backgroundColor,
            },
            lottieStyle,
          ]}
        />
      </View>
      <Animated.View style={lottieStyle}>
        <LottieView
          source={item.animation}
          style={{ width: width * 0.9, height: width * 0.9 }}
          autoPlay
          loop
        />
      </Animated.View>
      <Text
        className="text-center font-fredokaMedium text-[36px] mt-4"
        style={{ color: item.textColor }}
      >
        {item.text}
      </Text>
    </View>
  );
}
