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

const RecipeSteps = () => {
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
    if (step < recipeSteps.length) {
      setStep(step + 1);
    } else {
      // Finish cooking
      router.back();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Choose the correct animation based on currentStep.animation
  const animationSource =
    currentStep.animation === "mixing"
      ? Mixing
      : currentStep.animation === "frying"
      ? Frying
      : currentStep.animation === "serving"
      ? Serving
      : Mixing; // fallback

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className=" p-2 ">
          <Back />
        </TouchableOpacity>

        <View className="flex-row justify-between ">
          <Text className="text-lg text-center font-fredokaMedium">
            Step {step} of {recipeSteps.length}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.back()} className="opacity-0">
          <Back />
        </TouchableOpacity>
      </View>
      <View className="pt-6 px-4">
        <Text className="text-center text-[24px] font-fredokaMedium">
          {currentStep.title}
        </Text>
      </View>

      <ScrollView>
        <View className="px-4 flex-col gap-10  items-center justify-center">
          <LottieView
            source={animationSource}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />

          <Text className="text-[14px] font-bdogroteskRegular">
            {currentStep.description}
          </Text>
        </View>
      </ScrollView>

      <View className="mt-auto p-4  border-gray-200">
        {/* Align Next to right when no Previous, else space-between */}
        <View
          className={`flex-row ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <TouchableOpacity
              onPress={handlePrev}
              className="px-6 py-3 border  border-gray-300 rounded-[18px]"
            >
              <Text className="text-base font-fredokaMedium">Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNext}
            className={`px-8 py-3 bordery-[#41a4f0] rounded-[18px] ${
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
