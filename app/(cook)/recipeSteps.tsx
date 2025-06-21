import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import { useStepContext } from "@/context/StepContext";
import Back from "@/assets/svg/Back";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Mixing from "@/assets/animations/Mixing.json";
import Frying from "@/assets/animations/Frying.json";
import Serving from "@/assets/animations/Serving.json";
import * as Speech from "expo-speech"; // ✅ import TTS module

interface Timer {
  label: string;
  durationSec: number;
}

const RecipeSteps: React.FC = () => {
  const { breakfast } = useGetFilteredBreakfast();
  const { step, setStep } = useStepContext();

  if (!breakfast) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  const recipeSteps = breakfast.recipe;
  const currentStep = recipeSteps[step - 1];

  const handleNext = () => {
    Speech.stop();
    if (step < recipeSteps.length) {
      setStep(step + 1);
    } else {
      router.replace("/(cook)/congrats");
    }
  };

  const handlePrev = () => {
    Speech.stop();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // ✅ TTS Function
  const handleSpeak = () => {
    if (currentStep?.description) {
      Speech.stop();
      Speech.speak(currentStep.description, { rate: 1.0 });
    }
  };

  const timers: Timer[] =
    Array.isArray(currentStep.timers) && currentStep.timers.length > 0
      ? (currentStep.timers as Timer[])
      : currentStep.durationSec
      ? [{ label: "Timer", durationSec: currentStep.durationSec }]
      : [];

  const animationSource =
    currentStep.animation === "mixing"
      ? Mixing
      : currentStep.animation === "frying"
      ? Frying
      : currentStep.animation === "serving"
      ? Serving
      : Mixing;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Back />
        </TouchableOpacity>
        <Text className="text-lg font-fredokaMedium">
          Step {step} of {recipeSteps.length}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* ✅ Title + Read Button */}
      <View className="px-4 pt-4 items-center">
        <Text className="text-center text-[24px] font-fredokaMedium">
          {currentStep.title}
        </Text>

        <TouchableOpacity
          onPress={handleSpeak}
          className="mt-2 bg-[#41a4f0] px-4 py-2 rounded-full"
        >
          <Text className="text-white font-fredokaMedium">
            🔊 Read instructions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="px-4 flex-col gap-10 items-center justify-center py-6">
          <LottieView
            source={animationSource}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />

          <Text className="text-[14px] font-bdogroteskRegular">
            {currentStep.description}
          </Text>

          {timers.length > 0 && (
            <View className="flex-row space-x-4 mt-4">
              {timers.map((t: Timer, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() =>
                    router.push(
                      `/timer?duration=${
                        t.durationSec
                      }&label=${encodeURIComponent(t.label)}`
                    )
                  }
                  className="px-4 py-2 bg-[#41a4f0] rounded-lg"
                >
                  <Text className="text-white text-base">
                    {`Start ${t.label}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <View
          className={`flex-row ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <TouchableOpacity
              onPress={handlePrev}
              className="px-6 py-3 border border-gray-300 rounded-[18px]"
            >
              <Text className="text-base font-fredokaMedium">Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNext}
            className={`px-8 py-3 rounded-[18px] ${
              step === recipeSteps.length ? "bg-[#4CAF50]" : "bg-[#41a4f0]"
            }`}
          >
            <Text className="text-white text-base font-fredokaMedium">
              {step === recipeSteps.length ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecipeSteps;
