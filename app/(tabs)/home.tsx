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

        <ScrollView>
          <BreakfastCard
            uri={breakfast?.image || ""}
            name={breakfast?.name || ""}
            loading={isBreakfastLoading}
          />

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
            onPress={() => updateGoal("Sinee")}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
