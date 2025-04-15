// ProgressBar.tsx

import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { OnboardingScreenData } from "../../data/data";

type Props = {
  dataLength: number;
  x: SharedValue<number>;
  data: OnboardingScreenData[]; // we passed the entire data array
};

export default function ProgressBar({ dataLength, x, data }: Props) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // Build our inputRange and outputRange arrays
  // For i from 0..(dataLength-1), inputRange[i] = i * SCREEN_WIDTH
  // outputRange[i] = data[i].backgroundColor || "#000"
  const inputRange = data.map((_, i) => i * SCREEN_WIDTH);
  const outputRange = data.map((slide) => slide.textColor || "#FFF");

  const progressStyle = useAnimatedStyle(() => {
    // 1) Interpolate the fill width from 0% to 100% across all slides
    const progress = interpolate(
      x.value,
      [0, SCREEN_WIDTH * (dataLength - 1)],
      [0, 1],
      Extrapolation.CLAMP
    );

    // 2) Interpolate the fill color for each slide
    const backgroundColor = interpolateColor(x.value, inputRange, outputRange);

    return {
      width: `${progress * 100}%`,
      backgroundColor, // apply the interpolated color
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 10,
  },
});
