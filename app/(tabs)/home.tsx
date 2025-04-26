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

const Home = () => {
  const { user } = useGetCurrentUserData();
  const userName = user?.[0]?.name;
  const userStreak = user?.[0]?.streak_count;

  const { breakfast, isBreakfastLoading } = useGetFilteredBreakfast();
  const { updateGoal } = useUpdateGoal();
  const { updateStreak } = useUpdateUserStreak();
  const { updateStartDate } = useUpdateStartDate();

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
              <View className="flex-col gap-4">
                <View className="flex-row items-center justify-center gap-4">
                  <View className="flex-col gap-2 bg-[rgba(213,212,212,0.815)] rounded-[16px] py-6 px-10 min-w-[100px]">
                    <Calories />
                    <Text className="text-center font-fredokaRegular">
                      Calories
                    </Text>
                    <Text className="text-center text-[18px]  font-fredokaMedium">
                      {breakfast?.nutritions?.calories}
                    </Text>
                  </View>
                  <View className="flex-col gap-2 bg-[rgba(213,212,212,0.815)] rounded-[16px] py-6 px-10 min-w-[100px]">
                    <Protein />
                    <Text className="text-center font-fredokaRegular">
                      Protein
                    </Text>
                    <Text className="text-center text-[18px]  font-fredokaMedium">
                      {breakfast?.nutritions?.protein}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-center gap-4">
                  <View className="flex-col gap-2 bg-[rgba(213,212,212,0.815)] rounded-[16px] py-6 px-10 min-w-[100px]">
                    <Carbs />
                    <Text className="text-center font-fredokaRegular">
                      Carbs
                    </Text>
                    <Text className="text-center text-[18px]  font-fredokaMedium">
                      {breakfast?.nutritions?.carbs}
                    </Text>
                  </View>
                  <View className="flex-col gap-2  bg-[rgba(213,212,212,0.815)] rounded-[16px] py-6 px-10 min-w-[100px]">
                    <Fat />
                    <Text className="text-center font-fredokaRegular">Fat</Text>
                    <Text className="text-center text-[18px]  font-fredokaMedium">
                      {breakfast?.nutritions?.fat}
                    </Text>
                  </View>
                </View>
              </View>
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
