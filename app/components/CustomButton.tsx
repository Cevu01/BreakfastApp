import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Extrapolation,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { OnboardingScreenData } from "../../data/data";
import RightArrow from "../../assets/svg/RightArrow";

type Props = {
  data: OnboardingScreenData[]; // <-- NEW: entire slides array
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingScreenData>>;
  x: SharedValue<number>;
  onSubmit?: () => void;
};

const CustomButton = ({
  data,
  dataLength,
  flatListRef,
  flatListIndex,
  x,
  onSubmit,
}: Props) => {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // 1) Animate button’s width for the last screen
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  // 2) Arrow fade-out on last slide
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  // 3) "Get Started" text fade-in on last slide
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  // 4) Multi-stop color interpolation using each slide's backgroundColor
  //    a) Build arrays for inputRange / outputRange
  const inputRange = data.map((_, i) => i * SCREEN_WIDTH);
  const outputRange = data.map((slide) => slide.textColor || "#FFF");

  //    b) Animate background color
  const animatedColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      inputRange,
      outputRange,
      "RGB"
      // omit the 5th argument, or only pass { gamma: 2.2, easing: ... } if needed
    );
    return { backgroundColor };
  });

  return (
    <TouchableWithoutFeedback
      onPress={async () => {
        if (flatListIndex.value < dataLength - 1) {
          // not on last slide -> go to next
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          // on last slide -> do final submit or navigate
          if (onSubmit) {
            try {
              await onSubmit();
              router.replace("/(tabs)/home");
            } catch (error) {
              console.error("Error submitting:", error);
            }
          } else {
            router.replace("/(tabs)/home");
          }
        }
      }}
    >
      <Animated.View
        style={[
          styles.container,
          buttonAnimationStyle, // width/height
          animatedColorStyle, // backgroundColor
        ]}
      >
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
          <RightArrow width={30} height={30} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    // We keep a fallback color here if you like:
    backgroundColor: "#1e2169",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});
