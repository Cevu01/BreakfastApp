import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

type Props = {
  dataLength: number;
  x: SharedValue<number>;
};

const ProgressBar = ({ dataLength, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const progressStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      x.value,
      [0, SCREEN_WIDTH * (dataLength - 1)],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { width: `${progress * 100}%` };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyle]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 10,
    backgroundColor: "#fff",

    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#b28dff",
  },
});
