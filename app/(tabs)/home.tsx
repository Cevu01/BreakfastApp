import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { signOutFromGoogle } from "../services/GoogleAuth";
import { useBreakfastDietType } from "@/queries/breakfastQueries";
import {
  useGetCurrentUserData,
  useUpdateGoal,
  useUpdateUserActivity,
} from "@/queries/usersQueries";

type ingredient = {
  name: string;
  unit: string;
  quantity: number;
};

type breakfast = {
  id: number;
  name: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: ingredient[];
};

const Home = () => {
  const { isUpdatingGoal, updateGoal } = useUpdateGoal();
  const { updateUserStreak, isUpdatingUserStreak } = useUpdateUserActivity();
  const { user, isGettingCurrentUser } = useGetCurrentUserData();
  const userDiet = user?.[0].diet_type;

  const { breakfastDietType, isBreakfastsDietTypeLoading } =
    useBreakfastDietType(userDiet ?? "");

  const handleUpdateGoal = () => {
    updateGoal("Sinee");
  };

  const handleUpdateStreak = () => {
    updateUserStreak();
  };

  // useEffect(() => {
  //   updateUserStreak();
  // }, []);

  return (
    <View className="flex-1 items-center">
      <View
        style={{
          width: "100%",
          height: 280,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isBreakfastsDietTypeLoading ? (
          <ActivityIndicator size="small" color={"#333"} />
        ) : (
          <Image
            source={{
              uri: breakfastDietType?.[0]?.image,
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className=" flex items-center justify-center bg-black w-20 h-12 mt-6"
      >
        <Text className="text-white flex items-center">Go on index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signOutFromGoogle}
        className=" flex items-center justify-center bg-black  w-28 h-8 mt-6"
      >
        <Text className="text-white flex items-center">Sign out out</Text>
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
        <Text className="text-white flex items-center">Update strek</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
