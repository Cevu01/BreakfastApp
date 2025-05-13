import { Text, View } from "react-native";
import React from "react";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";

const Cook = () => {
  const { breakfast, isBreakfastLoading } = useGetFilteredBreakfast();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-black">{breakfast?.info.time}</Text>
    </View>
  );
};

export default Cook;
