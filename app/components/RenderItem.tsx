import React from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingScreenData } from "@/data/data";

type Props = {
  item: OnboardingScreenData;
  index: number;
  x: SharedValue<number>;
  onSelectAnswer?: (questionId: number, answerId: number) => void;
  selectedAnswers?: { [key: number]: number | null };
  name?: string;
  setName?: (val: string) => void;
  age?: string;
  setAge?: (val: string) => void;
  onNameAgeSubmit?: () => void;
  flatListRef?: React.RefObject<FlatList<OnboardingScreenData>>;
  dataLength?: number;
};

const RenderItem = ({
  item,
  index,
  x,
  onSelectAnswer,
  selectedAnswers,
  name,
  setName,
  age,
  setAge,
  onNameAgeSubmit,
  flatListRef,
  dataLength,
}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // Circle scale effect in background
  const circleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }] };
  });

  // ----- Input Slide (ID=14) -----
  if (item.id === 14) {
    return (
      <View
        style={[
          styles.slideContainer,
          { width: SCREEN_WIDTH, backgroundColor: item.backgroundColor },
        ]}
      >
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              {
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                borderRadius: SCREEN_WIDTH / 2,
                backgroundColor: item.backgroundColor,
              },
              circleStyle,
            ]}
          />
        </View>

        <Text style={[styles.bigText, { color: item.textColor }]}>
          Finally, a little more about you:
        </Text>

        <View style={{ width: "80%" }}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <TouchableOpacity style={styles.customButton} onPress={onNameAgeSubmit}>
          <Text style={styles.customButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ----- Normal Slides (Animation or Question) -----
  // Lottie animation style for a subtle vertical movement
  const lottieStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  return (
    <View
      style={[
        styles.slideContainer,
        { width: SCREEN_WIDTH, backgroundColor: item.backgroundColor },
      ]}
    >
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleStyle,
          ]}
        />
      </View>

      {/* If there's an animation, show Lottie */}
      {item.animation && (
        <Animated.View style={lottieStyle}>
          <LottieView
            source={item.animation}
            style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
            autoPlay
            loop
          />
        </Animated.View>
      )}

      {/* If type="animation" => show big text */}
      {item.type === "animation" && (
        <Text style={[styles.bigText, { color: item.textColor }]}>
          {item.text}
        </Text>
      )}

      {/* If type="question" => show question & answers, auto-swipe on answer */}
      {item.type === "question" && (
        <>
          <Text style={[styles.questionText, { color: item.textColor }]}>
            {item.question}
          </Text>
          <View style={styles.answersContainer}>
            {item.answers.map((answer) => {
              const isSelected =
                selectedAnswers && selectedAnswers[item.id] === answer.id;
              return (
                <TouchableOpacity
                  key={answer.id}
                  style={[
                    styles.answerButton,
                    isSelected && styles.answerButtonSelected,
                  ]}
                  onPress={() => {
                    // 1) Mark the selected answer => highlight
                    onSelectAnswer?.(item.id, answer.id);

                    // 2) Wait ~300ms so user sees highlight
                    setTimeout(() => {
                      // 3) Scroll to next slide if in range
                      if (flatListRef && dataLength) {
                        const nextIndex = index + 1;
                        if (nextIndex < dataLength) {
                          flatListRef.current?.scrollToIndex({
                            index: nextIndex,
                            animated: true,
                          });
                        }
                      }
                    }, 300);
                  }}
                >
                  <Text style={[styles.answerText, { color: item.textColor }]}>
                    {answer.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bigText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  answersContainer: {
    width: "100%",
  },
  answerButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    alignItems: "center",
  },
  answerButtonSelected: {
    backgroundColor: "#c24f25",
  },
  answerText: {
    fontSize: 18,
  },

  // Input-specific
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  customButton: {
    padding: 15,
    backgroundColor: "#005b4f",
    borderRadius: 10,
    marginTop: 10,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
