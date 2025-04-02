import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { signOutFromGoogle } from "../../services/GoogleAuth";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import {
  useUpdateGoal,
  useUpdateStartDate,
  useUpdateUserStreak,
} from "@/queries/usersQueries";

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
    <View className="flex-1 items-center">
      <View
        style={{
          width: "100%",
          height: 280,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isBreakfastLoading ? (
          <ActivityIndicator size="small" color={"#333"} />
        ) : (
          breakfast && (
            <Image
              source={{
                uri: breakfast.image,
              }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          )
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
