// Home.tsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
import { MeshGradientView } from "expo-mesh-gradient";

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
    <SafeAreaView className="flex-1 relative bg-transparent">
      {/* 1) full-screen gradient underlay */}
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={[
          "#FFB3BA",
          "#FFDFBA",
          "#FFFFBA",
          "#BAFFC9",
          "#BAE1FF",
          "#D5BAFF",
          "#FFC8DD",
          "#C8E7FF",
          "#E2F0CB",
        ]}
        points={[
          [0.0, 0.0],
          [0.5, 0.0],
          [1.0, 0.0],
          [0.0, 0.5],
          [0.5, 0.5],
          [1.0, 0.5],
          [0.0, 1.0],
          [0.5, 1.0],
          [1.0, 1.0],
        ]}
      />

      {/* 2) your normal content, on top of the gradient */}
      <View className="flex-2 px-[16px] pt-[24px]">
        <View className="flex-row justify-between pb-6">
          <Text className="text-[30px] font-fredokaMedium">
            Good morning, {userName}
          </Text>
          <View className="flex-row items-center justify-center gap-2">
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
            className=" flex items-center justify-center bg-black  w-42 h-8 mt-6"
          >
            <Text className="text-white flex items-center">Go on index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signOutFromGoogle}
            className=" flex items-center justify-center bg-black h-8 mt-6"
          >
            <Text className="text-white flex items-center">
              Sign out google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdateGoal}
            className=" flex items-center justify-center bg-black h-8 mt-6"
          >
            <Text className="text-white flex items-center">Update goal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdateStreak}
            className=" flex items-center justify-center bg-black h-8 mt-6"
          >
            <Text className="text-white flex items-center">Update streak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdateStartDate}
            className=" flex items-center justify-center bg-black h-8 mt-6"
          >
            <Text className="text-white flex items-center">Set start date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signOutFromApple}
            className=" flex items-center justify-center bg-black h-8 mt-6"
          >
            <Text className="text-white flex items-center">Sign out apple</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
