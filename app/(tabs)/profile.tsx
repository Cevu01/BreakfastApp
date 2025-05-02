import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import Profile from "../../assets/svg/Profile";
const profile = () => {
  const { user, isGettingCurrentUser } = useGetCurrentUserData();

  const userName = user?.[0]?.name;
  const userStreak = user?.[0]?.streak_count;
  const userDiet = user?.[0]?.diet_type;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-6">
        <View className="pb-6">
          <Text className="text-[30px] text-center font-fredokaMedium">
            Account
          </Text>
        </View>
        <View className="flex-col items-center gap-2 pt-6">
          <Profile />
          <Text className="text-[20px] font-fredokaMedium">{userName}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
