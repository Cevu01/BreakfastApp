import React from "react";
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
import {
  OnboardingScreenData,
  OnboardingQuestionData,
  OnboardingIllustrationData,
} from "@/data/data";

type Props = {
  item: OnboardingScreenData;
  index: number;
  // currentIndex: number;
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
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // **Hook 1**: background circle animation
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

  // **Hook 2**: Lottie translateY animation
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

  //Benefits slide
  if (item.type === "illustration") {
    const slide = item as OnboardingIllustrationData;
    return (
      <View
        // match your testimonials container paddings
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: slide.backgroundColor,
          paddingTop: 34,
          paddingBottom: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        className="flex-1 px-[16px]"
      >
        {/* Title styled like testimonials */}
        <Text
          className="text-[36px] font-fredokaMedium"
          style={{ color: slide.textColor, paddingBottom: 10 }}
        >
          {slide.title}
        </Text>
        {/* actual SVG */}
        <View>
          <slide.component
            width={SCREEN_WIDTH * 0.9}
            height={SCREEN_WIDTH * 0.9}
          />
        </View>

        <Text
          className=" text-[24px] font-fredokaMedium text-center"
          style={{ color: slide.textColor }}
        >
          {slide.text}
        </Text>
      </View>
    );
  }

  // 1) Input slide (ID=14)
  if (item.id === 14) {
    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    const isSubmitDisabled =
      name.trim().length === 0 || !isNameValid || age.trim().length === 0;

    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: item.backgroundColor,
        }}
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

  // 2) Testimonials slide (vertical stack)
  if (item.type === "testimonials") {
    const PHOTO_SIZE = 46;
    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: item.backgroundColor,
          paddingBottom: 120,
          paddingTop: 70,
        }}
        className="flex-1 px-[16px]  "
      >
        <Text
          className="text-[36px] font-fredokaMedium"
          style={{ color: item.textColor, paddingBottom: 10 }}
        >
          What our users say
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 30, gap: 16 }}
          className="flex-col"
        >
          {item.testimonials.map((t, idx) => (
            <View
              key={idx}
              style={{ width: SCREEN_WIDTH * 0.9 }}
              className="bg-[#03334F] rounded-[24px] p-4 self-center"
            >
              <View className="flex-row items-center">
                <View
                  style={{
                    width: PHOTO_SIZE,
                    height: PHOTO_SIZE,
                    borderRadius: 12,
                  }}
                  className=" overflow-hidden mr-3"
                >
                  {typeof t.photo === "number" ? (
                    <Image
                      source={t.photo}
                      style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
                      resizeMode="cover"
                    />
                  ) : (
                    <t.photo width={PHOTO_SIZE} height={PHOTO_SIZE} />
                  )}
                </View>
                <Text
                  className="flex-1 text-[18px] text-white  font-fredokaRegular font-bold"
                  style={{ color: "#fff" }}
                >
                  {t.title}
                </Text>
              </View>
              <Text
                className="mt-2 text-[14px] font-fredokaRegular"
                style={{ color: "#D8EFFD" }}
              >
                {t.text}
              </Text>
              <Text
                className="font-fredokaLight"
                style={{ color: "#D8EFFD", paddingTop: 8 }}
              >
                {t.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // 3) Animation & Question slides (default)
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        backgroundColor: item.backgroundColor,
      }}
      className="flex-1 pt-[90px] flex-col gap-[24px] items-center px-[16px]"
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

      {/* Lottie animation */}
      {item.animation && (
        <Animated.View style={lottieStyle}>
          <LottieView
            source={item.animation}
            style={{
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_WIDTH * 0.9,
            }}
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

      {item.type === "question" && (
        <>
          <Text
            className="text-[32px] font-fredokaMedium font-bold pt-[60px]"
            style={{ color: item.textColor }}
          >
            {(item as OnboardingQuestionData).question}
          </Text>
          <View className="w-full">
            {(item as OnboardingQuestionData).answers.map((answer) => {
              const isSelected = selectedAnswers?.[item.id] === answer.id;
              return (
                <TouchableOpacity
                  key={answer.id}
                  className={`py-5 px-5 rounded-[16px] border border-[#0A7BC2] my-2.5 ${
                    isSelected ? "bg-[#51B6F6]" : "bg-[#D8EFFD]"
                  }`}
                  onPress={() => {
                    onSelectAnswer?.(item.id, answer.id);
                    setTimeout(() => {
                      const next = index + 1;
                      if (flatListRef && dataLength && next < dataLength) {
                        flatListRef.current?.scrollToIndex({
                          index: next,
                          animated: true,
                        });
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
