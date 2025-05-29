import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export function usePulseAnimation(
  fromValue = 1,
  toValue = 1.1,
  duration = 600
): Animated.Value {
  const anim = useRef(new Animated.Value(fromValue)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: fromValue,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim, fromValue, toValue, duration]);

  return anim;
}
