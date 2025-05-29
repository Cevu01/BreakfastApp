import { useRef, useCallback } from "react";
import { Animated } from "react-native";

export function useFadeIn(
  from = 0,
  to = 1,
  duration = 500
): {
  opacity: Animated.Value;
  onLoad: () => void;
} {
  const opacity = useRef(new Animated.Value(from)).current;

  const onLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: to,
      duration,
      useNativeDriver: true,
    }).start();
  }, [opacity, to, duration]);

  return { opacity, onLoad };
}
