import { StyleSheet, Pressable, GestureResponderEvent } from "react-native";
import React, { useEffect } from "react";
import { icon } from "../constants/icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Define valid route names
type RouteName = "home" | "progress" | "profile";

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
  routeName: RouteName; // Ensure routeName is only one of these
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
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {/* Explicitly type `icon[routeName]` to prevent indexing error */}
        {icon[routeName]({ color: isFocused ? "#FFF" : "#222" })}
      </Animated.View>
      <Animated.Text
        style={[
          { color: isFocused ? "#673ab7" : "#222", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBarButton;
