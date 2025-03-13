import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { OnboardingData } from "@/data/data";
import LottieView from "lottie-react-native";

type Props = {
  item: OnboardingData;
  index: number;
};

const RenderItem = ({ item, index }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <View>
      <View>
        <LottieView
          source={item.animation}
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
          autoPlay
          loop
        />
      </View>
      <Text>{item.text}</Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({});
