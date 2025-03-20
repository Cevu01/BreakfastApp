import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { OnboardingScreenData } from "@/data/data";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useUpdateGoal } from "@/queries/usersQueries";

type Props = {
  item: OnboardingScreenData;
  index: number;
  x: SharedValue<number>;
  onSelectAnswer?: (questionId: number, answerId: number) => void;
  selectedAnswers?: { [key: number]: number | null };
};

const RenderItem = ({
  item,
  index,
  x,
  onSelectAnswer,
  selectedAnswers,
}: Props) => {
  const { isUpdatingGoal, updateGoal } = useUpdateGoal();

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // Shared animated styles for circle and optional animation
  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY: translateYAnimation }] };
  });

  const circleAnimation = useAnimatedStyle(() => {
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
    return { transform: [{ scale: scale }] };
  });

  // if (item.type === "question") {
  //   console.log(item.answers);
  // }

  return (
    <View
      style={[
        styles.itemContainer,
        { width: SCREEN_WIDTH, backgroundColor: item.backgroundColor },
      ]}
    >
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>
      {item.animation && (
        <Animated.View style={lottieAnimationStyle}>
          <LottieView
            source={item.animation}
            style={{
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_WIDTH * 0.9,
            }}
            autoPlay
            loop
          />
        </Animated.View>
      )}
      {item.type === "animation" && (
        <Text style={[styles.itemText, { color: item.textColor }]}>
          {item.text}
        </Text>
      )}
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
                    console.log(answer.text);
                    updateGoal(answer.text);
                    onSelectAnswer && onSelectAnswer(item.id, answer.id);
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
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
    paddingHorizontal: 20,
  },
  itemText: {
    textAlign: "center",
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
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
});
