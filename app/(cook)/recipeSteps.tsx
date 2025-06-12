// screens/RecipeSteps.tsx
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import { useStepContext } from "@/context/StepContext";
import Back from "@/assets/svg/Back";
import { router } from "expo-router";

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
      setStep(1); // Reset to first step
      router.back();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-4 p-2">
          <Back />
        </TouchableOpacity>

        <View className="flex-row justify-between mb-6">
          <Text className="text-lg font-fredokaMedium">
            Step {step} of {recipeSteps.length}
          </Text>
          <Text className="text-lg font-fredokaMedium text-[#41a4f0]">
            {currentStep.title}
          </Text>
        </View>

        <Text className="text-base mb-8">{currentStep.description}</Text>
      </View>

      <View className="mt-auto p-4 border-t border-gray-200">
        <View className="flex-row justify-between">
          {step > 1 && (
            <TouchableOpacity
              onPress={handlePrev}
              className="px-6 py-3 border border-gray-300 rounded-lg"
            >
              <Text className="text-base">Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNext}
            className={`px-8 py-3 rounded-lg ${
              step === recipeSteps.length ? "bg-[#4CAF50]" : "bg-[#41a4f0]"
            }`}
          >
            <Text className="text-white text-base">
              {step === recipeSteps.length ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecipeSteps;
