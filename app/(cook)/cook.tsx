import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import Back from "@/assets/svg/Back";
import { router } from "expo-router";
import Rating from "@/assets/svg/Rating";
import Timer from "@/assets/svg/Timer";
import Easy from "@/assets/svg/Easy";
import Servings from "@/assets/svg/Servings";
import Medium from "@/assets/svg/Medium";
import Hard from "@/assets/svg/Hard";
import { usePulseAnimation } from "@/hooks/usePulseAnimation";
import { useFadeIn } from "@/hooks/useFadeIn";
import StepComponent from "../components/StepComponent";
import { useStepContext } from "@/context/StepContext";

const Cook = () => {
  const { breakfast } = useGetFilteredBreakfast();
  const { step, setStep } = useStepContext(); // Get step from context

  const pulseAnim = usePulseAnimation(1, 1.04, 600);
  const { opacity: imgOpacity, onLoad: onImageLoad } = useFadeIn(0, 1, 500);
  if (!breakfast) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Animated.Image
        source={{ uri: breakfast.image }}
        className="w-full h-[350px]"
        style={{ opacity: imgOpacity }}
        resizeMode="cover"
        onLoad={onImageLoad}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-[50px] left-[20px] p-4  bg-[rgba(255,255,255,0.73)] justify-center  rounded-[14px]"
      >
        <Back />
      </TouchableOpacity>
      <View className="absolute top-[50px] right-[20px] p-3.5  bg-[rgba(255,255,255,0.73)] justify-center  rounded-[14px]">
        <View className="flex-row gap-2">
          <Rating />
          <Text className="text-[18px] font-fredokaMedium">
            {breakfast?.info?.rating}
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 bg-white rounded-t-[24px] -mt-6 px-[16px] pt-[16px] ">
        <View className="flex-col gap-2 pb-8">
          <Text className="text-[30px] font-fredokaMedium pt-[12px]">
            {breakfast?.name}
          </Text>

          <Text className="text-[16px] font-fredokaMedium leading-[20px]">
            {breakfast?.description}
          </Text>
        </View>

        <View className="flex-row items-center justify-center gap-[18px]">
          <View className="min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center bg-[#C2E1FF] p-4 rounded-[18px]">
            <Timer />
            <Text className="text-[16px] text-[#004e9b] font-fredokaMedium">
              {breakfast?.info?.time} min
            </Text>
          </View>

          {/* Difficulty Block */}
          <View
            className={`min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center px-4 py-4 rounded-[18px] ${
              breakfast?.info?.difficulty === "medium"
                ? "bg-[#FEE9D7]"
                : breakfast?.info?.difficulty === "hard"
                ? "bg-[#ffc4c4]"
                : "bg-[#BFEDE0]"
            }`}
          >
            {breakfast?.info?.difficulty === "medium" ? (
              <Medium />
            ) : breakfast?.info?.difficulty === "hard" ? (
              <Hard />
            ) : (
              <Easy />
            )}
            <Text
              className={`text-[16px] font-fredokaMedium ${
                breakfast?.info?.difficulty === "medium"
                  ? "text-[#8A4B00]"
                  : breakfast?.info?.difficulty === "hard"
                  ? "text-[#8B0000]"
                  : "text-[#1f705b]"
              }`}
            >
              {breakfast?.info?.difficulty}
            </Text>
          </View>

          {/* Servings Block */}
          <View className="min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center bg-[#D8CBF6] p-4 rounded-[18px]">
            <Servings />
            <Text className="text-[16px] text-[#391684] font-fredokaMedium">
              {breakfast?.info?.servings} serv
            </Text>
          </View>
        </View>
        <View className="pt-[40px]">
          <StepComponent
            totalSteps={breakfast.recipe.length}
            currentStep={step}
          />
        </View>
      </ScrollView>
      <View className="absolute bottom-[30px] w-full px-[16px]">
        <TouchableOpacity
          onPress={() => {
            // setStep(1);
            router.push("/(cook)/recipeSteps");
          }}
          style={{ transform: [{ scale: pulseAnim }] }}
          className="bg-[#41a4f0] rounded-[18px] p-4"
        >
          <Text className="text-white text-[20px] font-fredokaMedium text-center">
            {step > 1 ? "Continue cooking" : "Start cooking"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cook;
