import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import { useBreakfastDietType } from "@/queries/breakfastQueries";

const profile = () => {
  const { user, isGettingCurrentUser } = useGetCurrentUserData();

  const userName = user?.[0].display_name?.split(" ")[0];
  const userStreak = user?.[0].streak_count;
  const userDiet = user?.[0].diet_type;

  return (
    <View className="flex-1 justify-center items-center">
      {isGettingCurrentUser ? (
        <ActivityIndicator size="small" color={"#333"} />
      ) : (
        <View className="flex-row gap-8 mt-6 items-center justify-center">
          <Text className="mt-4 text-xl font-bdogroteskRegular">
            Name: {userName}
          </Text>
          <Text className="mt-4 text-xl font-bdogroteskRegular">
            Streak: {userStreak}
          </Text>
          <Text className="mt-4 text-xl font-bdogroteskRegular">
            Diet: {userDiet}
          </Text>
        </View>
      )}
    </View>
  );
};

export default profile;
