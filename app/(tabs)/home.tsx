import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { signOutFromGoogle } from "../services/GoogleAuth";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import {
  useGetCurrentUserData,
  useUpdateGoal,
  useUpdateStartDate,
  useUpdateUserStreak,
} from "@/queries/usersQueries";
import { signOutFromApple } from "../services/AppleAuth";
import Streak from "@/assets/svg/Streak";
import { LinearGradient } from "expo-linear-gradient";
import BreakfastCard from "../components/BreakfastCard";

// type Ingredient = {
//   name: string;
//   unit: string;
//   quantity: number;
// };
// type Nutrition = {
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
// };

// type Breakfast = {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   nutritions: Nutrition[];
//   recipe: string;
//   diet_type: string;
//   day_number: number;
//   ingredients: Ingredient[];
// };

const Home = () => {
  const { updateGoal, isUpdatingGoal } = useUpdateGoal();
  const { updateStreak, isUpdatingStreak } = useUpdateUserStreak();
  const { updateStartDate, isUpdatingStartDate } = useUpdateStartDate();
  const { user, isGettingCurrentUser } = useGetCurrentUserData();

  const userName = user?.[0].name;
  const userStreak = user?.[0].streak_count;

  // Typing the response from the useGetBreakfast hook
  // const { breakfast, isBreakfastLoading } = useGetBreakfast();
  const { breakfast, isBreakfastLoading, error } = useGetFilteredBreakfast();
  // console.log(breakfast);

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
    <SafeAreaView className="flex-1 ">
      <View className="px-[16px] pt-6 ">
        <View className="pb-6 flex-row items-center justify-between">
          <Text className="text-[30px] font-fredokaMedium">
            Good morning,
            {userName}
          </Text>
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-[30px] font-fredokaMedium">{userStreak}</Text>
            <Streak />
          </View>
        </View>
        <ScrollView>
          <BreakfastCard
            uri={breakfast?.image}
            name={breakfast?.name}
            loading={isBreakfastLoading}
          />

          <TouchableOpacity
            onPress={() => router.push("/")}
            className=" flex items-center justify-center bg-black w-20 h-12 mt-6"
          >
            <Text className="text-white flex items-center">Go on index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signOutFromGoogle}
            className=" flex items-center justify-center bg-black  w-42 h-8 mt-6"
          >
            <Text className="text-white flex items-center">
              Sign out google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdateGoal}
            className=" flex items-center justify-center bg-black  w-28 h-8 mt-6"
          >
            <Text className="text-white flex items-center">Update goal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdateStreak}
            className=" flex items-center justify-center bg-black  w-28 h-8 mt-6"
          >
            <Text className="text-white flex items-center">Update streak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdateStartDate}
            className=" flex items-center justify-center bg-black  w-28 h-8 mt-6"
          >
            <Text className="text-white flex items-center">Set start date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signOutFromApple}
            className=" flex items-center justify-center bg-black  w-42 h-8 mt-6"
          >
            <Text className="text-white flex items-center">Sign out apple</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
