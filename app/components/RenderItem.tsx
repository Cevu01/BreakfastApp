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
  name = "",
  setName = () => {},
  age = "",
  setAge = () => {},
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
    // Validation: name must contain at least one letter and only letters/spaces
    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    const isSubmitDisabled =
      name.trim().length === 0 || !isNameValid || age.trim().length === 0;

    return (
      <View
        className="flex-1 justify-around items-center px-[16px]"
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
          className="text-[34px] font-fredokaMedium font-bold"
          style={{ color: item.textColor }}
        >
          Finally, a little more about you:
        </Text>
        <View className="flex-col gap-[8px] w-full">
          <TextInput
            className="bg-white text-[18px] font-fredokaRegular rounded-lg border border-[#0A7BC2] w-full py-[20px] px-4"
            placeholder="Enter your name"
            placeholderTextColor="#A9B2B1"
            value={name}
            onChangeText={setName}
          />
          {name.length > 0 && !isNameValid && (
            <Text className="text-red-500 text-sm font-fredokaRegular mt-1">
              Name can only contain letters and spaces.
            </Text>
          )}
          <TextInput
            className="bg-white text-[18px] font-fredokaRegular rounded-lg border border-[#0A7BC2] w-full py-[20px] px-4"
            placeholder="Enter your age"
            placeholderTextColor="#A9B2B1"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <TouchableOpacity
          disabled={isSubmitDisabled}
          onPress={() => {
            if (!isSubmitDisabled) {
              onNameAgeSubmit?.();
            }
          }}
          className={`py-[20px] w-full flex items-center justify-center rounded-[8px] ${
            isSubmitDisabled ? "bg-gray-400" : "bg-[#03334F]"
          }`}
        >
          <Text className="text-white font-fredokaRegular text-[18px] font-semibold">
            Submit
          </Text>
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
      className="flex-1 pt-[90px] flex-col gap-[24px] items-center px-[16px]"
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
            // For slide id 15, do not loop; for others, loop.
            loop={![15, 16].includes(item.id)}
          />
        </Animated.View>
      )}
      {item.type === "animation" && (
        <Text
          className="text-center font-fredokaMedium text-[36px] mb-2.5"
          style={{ color: item.textColor }}
        >
          {item.text}
        </Text>
      )}
      {item.type === "question" && (
        <>
          <Text
            className="text-[32px] font-bold pt-[60px] font-fredokaMedium"
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
                  className={`py-4 px-5 rounded-lg border border-[#0A7BC2] my-2.5 ${
                    isSelected ? "bg-[#51B6F6]" : "bg-[#D8EFFD] text-[#03334F]"
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
                    className="text-[18px] font-fredokaRegular"
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
