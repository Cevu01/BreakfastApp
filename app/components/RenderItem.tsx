// File: src/components/RenderItem.tsx
import React, { useState } from "react";
import { useWindowDimensions, FlatList } from "react-native";
import {
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
  OnboardingAnimationData,
} from "@/data/data";
import ReferralSlide from "./ReferralSlide";
import TestimonialsSlide from "./TestimonialsSlide";
import InputSlide from "./InputSlide";
import AnimationSlide from "./AnimationSlide";
import BenefitsSlide from "./BenefitsSlide";

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
  if (item.type === "benefits") {
    return <BenefitsSlide item={item as OnboardingIllustrationData} />;
  }

  // Input slide (ID 14)
  if (item.id === 14) {
    return (
      <InputSlide
        item={item as OnboardingAnimationData & { id: 14 }}
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        onSubmit={onNameAgeSubmit!}
        circleStyle={circleStyle}
      />
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
  if (item.type === "animation") {
    return (
      <AnimationSlide
        item={item as OnboardingAnimationData}
        lottieStyle={lottieStyle}
      />
    );
  }
};

export default RenderItem;
