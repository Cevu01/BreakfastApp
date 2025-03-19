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
import { useBreakfasts } from "@/queries/breakfastQueries";
import { useUpdateGoal } from "@/queries/usersQueries";

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
  const { isBreakfastsLoading, breakfasts } = useBreakfasts();

  const { isUpdatingGoal, updateGoal } = useUpdateGoal();

  const handleUpdateGoal = () => {
    updateGoal("Sinee");
  };

  return (
    <View className="flex-1 items-center">
      {isBreakfastsLoading ? (
        <ActivityIndicator size="small" color={"#333"} />
      ) : (
        <Image
          source={{
            uri: breakfasts?.[0]?.image,
          }}
          style={{ width: "100%", height: 280 }}
        />
      )}

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
    </View>
  );
};

export default Home;
