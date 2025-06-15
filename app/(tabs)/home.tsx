// Home.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import {
  useGetCurrentUserData,
  useUpdateGoal,
  useUpdateStartDate,
  useUpdateUserStreak,
} from "@/queries/usersQueries";
import Streak from "@/assets/svg/Streak";
import BreakfastCard from "../components/BreakfastCard";
import Protein from "@/assets/svg/Protein";
import Carbs from "@/assets/svg/Carbs";
import Fat from "@/assets/svg/Fat";
import Calories from "@/assets/svg/Calories";
import NutritionItem from "../components/NutritionsItem";
import IngredientsSection from "../components/IngredientsSection";

const Home = () => {
  const { user } = useGetCurrentUserData();
  const userName = user?.[0]?.name;
  const userStreak = user?.[0]?.streak_count;

  const { breakfast, isBreakfastLoading } = useGetFilteredBreakfast();
  const { updateGoal } = useUpdateGoal();
  const { updateStreak } = useUpdateUserStreak();
  const { updateStartDate } = useUpdateStartDate();
  const nutritions = [
    {
      Icon: Calories,
      label: "Calories",
      value: breakfast?.nutritions?.calories,
    },
    { Icon: Protein, label: "Protein", value: breakfast?.nutritions?.protein },
    { Icon: Carbs, label: "Carbs", value: breakfast?.nutritions?.carbs },
    { Icon: Fat, label: "Fat", value: breakfast?.nutritions?.fat },
  ];
  // console.log(JSON.stringify(breakfast?.breakfast_ingredients, null, 2));
  // console.log(breakfast?.info);

  const handleUpdateGoal = () => {
    updateGoal("Sinee");
  };

  const handleUpdateStartDate = () => {
    updateStartDate();
  };

  const handleUpdateStreak = () => {
    updateStreak();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* content on white background */}
      <View className="flex-1 px-4 pt-6">
        <View className="flex-row justify-between pb-6">
          <Text className="text-[30px] font-fredokaMedium">
            Good morning, {userName}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-[30px] font-fredokaMedium">{userStreak}</Text>
            <Streak />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-col gap-[30px]">
            <BreakfastCard
              uri={breakfast?.image || ""}
              name={breakfast?.name || ""}
              time={breakfast?.info?.time || ""}
              loading={isBreakfastLoading}
            />
            <View className="flex-col gap-4">
              <Text className="text-[18px] font-fredokaMedium">Nutritions</Text>

              <View className="flex-row flex-wrap justify-center gap-4">
                {nutritions.map((n, i) => (
                  <NutritionItem
                    key={i}
                    Icon={n.Icon}
                    label={n.label}
                    value={n.value ?? "-"}
                  />
                ))}
              </View>
            </View>
            <IngredientsSection
              ingredients={
                breakfast?.breakfast_ingredients?.[0]?.ingredients || []
              }
            />

            <TouchableOpacity
              onPress={handleUpdateStartDate}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Set start date</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
