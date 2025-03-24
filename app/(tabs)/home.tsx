import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { signOutFromGoogle } from "../services/GoogleAuth";
import { useGetTodaysBreakfastForUser } from "@/queries/breakfastQueries";
import {
  useUpdateGoal,
  useUpdateStartDate,
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
  const { updateGoal, isUpdatingGoal } = useUpdateGoal();
  const { updateUserStreak, isUpdatingUserStreak } = useUpdateUserActivity();
  const { updateStartDate, isUpdatingStartDate } = useUpdateStartDate();
  const { todaysBreakfastForUser, isTodaysBreakfastForUserLoading } =
    useGetTodaysBreakfastForUser();

  const handleUpdateGoal = () => {
    updateGoal("Sinee");
  };

  const handleUpdateStartDate = () => {
    updateStartDate();
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
        {isTodaysBreakfastForUserLoading ? (
          <ActivityIndicator size="small" color={"#333"} />
        ) : (
          <Image
            source={{
              uri: todaysBreakfastForUser?.image,
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
        <Text className="text-white flex items-center">Update streak</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUpdateStartDate}
        className=" flex items-center justify-center bg-black  w-28 h-8 mt-6"
      >
        <Text className="text-white flex items-center">Set start date</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
