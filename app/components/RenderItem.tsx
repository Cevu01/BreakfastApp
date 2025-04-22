// File: src/components/RenderItem.tsx
import React, { useState } from "react";
import {
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import QuestionSlide from "./QuestionSlide";
import {
  OnboardingScreenData,
  OnboardingQuestionData,
  OnboardingIllustrationData,
  OnboardingReferralData,
  OnboardingTestimonialsData,
} from "@/data/data";
import ReferralSlide from "./ReferralSlide";
import TestimonialsSlide from "./TestimonialsSlide";

type Props = {
  item: OnboardingScreenData;
  index: number;
  x: SharedValue<number>;
  onSelectAnswer?: (questionId: number, answerId: number | number[]) => void;
  selectedAnswers?: { [key: number]: number | number[] | null };
  name?: string;
  setName?: (val: string) => void;
  age?: string;
  setAge?: (val: string) => void;
  onNameAgeSubmit?: () => void;
  flatListRef?: React.RefObject<FlatList<OnboardingScreenData>>;
  dataLength?: number;
  onReferralSubmit?: (code: string | null) => void;
};

const RenderItem: React.FC<Props> = ({
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
  onReferralSubmit,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  // small state used only by illustration or multi-select inputs if needed
  const [otherText, setOtherText] = useState("");

  // Background circle animation
  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [1, 4, 4],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  // Lottie translateY animation
  const lottieStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [200, 0, -200],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  // Illustration slides
  if (item.type === "illustration") {
    const slide = item as OnboardingIllustrationData;
    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: slide.backgroundColor,
          paddingTop: 34,
          paddingBottom: 120,
          alignItems: "center",
          justifyContent: "space-around",
        }}
        className="flex-1 px-[16px]"
      >
        <Text
          className="text-[36px] font-fredokaMedium"
          style={{ color: slide.textColor, paddingBottom: 10 }}
        >
          {slide.title}
        </Text>
        <slide.component
          width={SCREEN_WIDTH * 0.9}
          height={SCREEN_WIDTH * 0.9}
        />
        <Text
          className="text-[24px] font-fredokaMedium text-center"
          style={{ color: slide.textColor }}
        >
          {slide.text}
        </Text>
      </View>
    );
  }

  // Input slide (ID 14)
  if (item.id === 14) {
    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    const isSubmitDisabled =
      name.trim().length === 0 || !isNameValid || age.trim().length === 0;
    return (
      <View
        style={{ width: SCREEN_WIDTH, backgroundColor: item.backgroundColor }}
        className="flex-1 justify-around items-center px-[16px]"
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
        <View className="w-full flex-col gap-[8px]">
          <TextInput
            className="bg-white text-[18px] font-fredokaRegular rounded-[14px] border border-[#0A7BC2] w-full py-[20px] px-4"
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
            className="bg-white text-[18px] font-fredokaRegular rounded-[14px] border border-[#0A7BC2] w-full py-[20px] px-4"
            placeholder="Enter your age"
            placeholderTextColor="#A9B2B1"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>
        <TouchableOpacity
          disabled={isSubmitDisabled}
          onPress={() => !isSubmitDisabled && onNameAgeSubmit?.()}
          className={`py-[20px] w-full items-center justify-center rounded-[14px] ${
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

  // Testimonials
  if (item.type === "testimonials") {
    return <TestimonialsSlide item={item as OnboardingTestimonialsData} />;
  }

  // Question slide forwards to the dedicated component
  if (item.type === "question") {
    return (
      <QuestionSlide
        item={item as OnboardingQuestionData}
        index={index}
        onSelectAnswer={onSelectAnswer}
        selectedAnswers={selectedAnswers}
        flatListRef={flatListRef}
        dataLength={dataLength}
      />
    );
  }
  if (item.type === "referral") {
    return (
      <ReferralSlide
        item={item as OnboardingReferralData}
        onSubmit={(code) => {
          // 1) call the new prop
          onReferralSubmit?.(code);
          // 2) advance to the next slide
          const next = index + 1;
          if (flatListRef && dataLength && next < dataLength) {
            flatListRef.current?.scrollToIndex({ index: next, animated: true });
          }
        }}
      />
    );
  }

  // Default: Animation slide
  return (
    <View
      style={{ width: SCREEN_WIDTH, backgroundColor: item.backgroundColor }}
      className="flex-1 pt-[90px] flex-col items-center px-[16px]"
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
            style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
            autoPlay
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
    </View>
  );
};

export default RenderItem;
