// app/(tabs)/Home.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import Streak from "@/assets/svg/Streak";
import BreakfastCard from "../components/BreakfastCard";
import Protein from "@/assets/svg/Protein";
import Carbs from "@/assets/svg/Carbs";
import Fat from "@/assets/svg/Fat";
import Calories from "@/assets/svg/Calories";
import NutritionItem from "../components/NutritionsItem";
import IngredientsSection from "../components/IngredientsSection";
import { useGetBreakfastWithProgress } from "@/queries/breakfastWithProgress";

const Home = () => {
  const { user } = useGetCurrentUserData();
  const userName = user?.[0]?.name;
  const userStreak = user?.[0]?.streak_count;

  type BreakfastWithProgress = {
    breakfast: {
      image?: string;
      name?: string;
      info?: { time?: number };
      nutritions?: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
      };
      breakfast_ingredients?: Array<{
        ingredients?: Array<any>;
      }>;
    };
    progress?: {
      status?: string;
      step_index?: number;
    };
  };

  const { data, isLoading } = useGetBreakfastWithProgress() as { data: BreakfastWithProgress; isLoading: boolean };
  const breakfast = data?.breakfast;
  const progress = data?.progress;

  const nutritions = [
    { Icon: Calories, label: "Calories", value: breakfast?.nutritions?.calories },
    { Icon: Protein, label: "Protein", value: breakfast?.nutritions?.protein },
    { Icon: Carbs,   label: "Carbs",   value: breakfast?.nutritions?.carbs },
    { Icon: Fat,     label: "Fat",     value: breakfast?.nutritions?.fat },
  ];

  const statusLabel: "Finished" | "Continue" | undefined =
    progress?.status === "completed"
      ? "Finished"
      : (progress?.step_index ?? 1) > 1
      ? "Continue"
      : undefined;

  return (
    <SafeAreaView className="flex-1 bg-white">
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
              time={breakfast?.info?.time || 0}
              loading={isLoading}
              statusLabel={statusLabel}
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
              ingredients={breakfast?.breakfast_ingredients?.[0]?.ingredients || []}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
