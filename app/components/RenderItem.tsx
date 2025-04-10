import React from "react";
import {
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

  // Animated style for the circular background effect.
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
        className="flex-1 justify-around items-center px-5"
        style={{ width: SCREEN_WIDTH, backgroundColor: item.backgroundColor }}
      >
        <View className="absolute inset-0 justify-end items-center">
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
        <Text
          className="text-center text-[34px] font-bold mb-2.5"
          style={{ color: item.textColor }}
        >
          Finally, a little more about you:
        </Text>
        <View className="w-4/5">
          <TextInput
            className="bg-white rounded-md px-3 py-2.5 mb-2.5 text-base"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-white rounded-md px-3 py-2.5 mb-2.5 text-base"
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>
        <TouchableOpacity
          className="p-4 bg-[#005b4f] rounded-lg mt-2.5"
          onPress={onNameAgeSubmit}
        >
          <Text className="text-white text-base font-semibold">Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ----- Normal Slides (Animation or Question) -----
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
      className="flex-1 justify-around items-center px-5"
      style={{ width: SCREEN_WIDTH, backgroundColor: item.backgroundColor }}
    >
      <View className="absolute inset-0 justify-end items-center">
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
      {item.animation && (
        <Animated.View style={lottieStyle}>
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
        <Text
          className="text-center text-[34px] font-bold mb-2.5"
          style={{ color: item.textColor }}
        >
          {item.text}
        </Text>
      )}
      {item.type === "question" && (
        <>
          <Text
            className="text-center text-[32px] font-bold my-5"
            style={{ color: item.textColor }}
          >
            {item.question}
          </Text>
          <View className="w-full">
            {item.answers.map((answer) => {
              const isSelected =
                selectedAnswers && selectedAnswers[item.id] === answer.id;
              return (
                <TouchableOpacity
                  key={answer.id}
                  className={`py-4 px-5 rounded-lg border border-gray-300 my-2.5 items-center ${
                    isSelected ? "bg-[#c24f25]" : ""
                  }`}
                  onPress={() => {
                    onSelectAnswer?.(item.id, answer.id);
                    // Wait 300 ms for the highlight, then auto-scroll to next slide.
                    setTimeout(() => {
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
                  <Text
                    className="text-[18px]"
                    style={{ color: item.textColor }}
                  >
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
