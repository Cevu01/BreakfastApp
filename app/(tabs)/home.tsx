// Home.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { signOutFromGoogle } from "../services/GoogleAuth";
import { signOutFromApple } from "../services/AppleAuth";
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
  useEffect(() => {
    if (!isBreakfastLoading && breakfast) {
      console.log(JSON.stringify(breakfast.breakfast_ingredients, null, 2));
    }
  }, [isBreakfastLoading, breakfast]);

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
              loading={isBreakfastLoading}
            />
            <View className="flex-col gap-4">
              <Text className="text-[18px] text-center font-fredokaMedium">
                Nutritions
              </Text>

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

            <View className="flex-row items-center gap-4">
              <View className="bg-[rgba(213,212,212,0.815)] flex-col gap-2"></View>
              <View></View>
              <View></View>
              <View></View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/")}
              className="bg-black w-42 h-8 mt-6 items-center justify-center"
            >
              <Text className="text-white">Go on index</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signOutFromGoogle}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Sign out google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUpdateGoal()}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Update goal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateStreak}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Update streak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateStartDate}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Set start date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signOutFromApple}
              className="bg-black h-8 mt-4 items-center justify-center"
            >
              <Text className="text-white">Sign out apple</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
