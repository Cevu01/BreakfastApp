import { Pressable, GestureResponderEvent } from "react-native";
import React, { useEffect } from "react";
import { icon } from "../constants/icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text, View } from "react-native";

type RouteName = "home" | "list" | "profile";

const TabBarButton = ({
  onPress,
  onLongPress,
  routeName,
  isFocused,
  color,
  label,
}: {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: RouteName;
  color: string;
  label: string;
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center gap-1"
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({ color: isFocused ? "#FFF" : "#222" })}
      </Animated.View>
      <Animated.Text
        className={`${
          isFocused
            ? "text-purple-700 font-bdogroteskDemiBold"
            : "text-gray-900 font-bdogroteskRegular"
        } text-xs`}
        style={animatedTextStyle}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;
