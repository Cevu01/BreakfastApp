import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useGetCurrentUserData } from "@/queries/usersQueries";

import Profile from "../../assets/svg/Profile";
import DietType from "../../assets/svg/DietType";
import Goal from "../../assets/svg/Goal";

const profile = () => {
  const { user, isGettingCurrentUser } = useGetCurrentUserData();

  const userName = user?.[0]?.name;
  const userStreak = user?.[0]?.streak_count;
  const userDiet = user?.[0]?.diet_type;
  const goal = user?.[0]?.goal;

  console.log(user);

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
        <View className="flex-col gap-4 pt-[60px]">
          <TouchableOpacity>
            <View className="flex-row gap-4 p-4 items-center rounded-[20px] bg-[rgba(213,212,212,0.815)]">
              <DietType />
              <Text className="text-[18px] font-fredokaRegular">
                {userDiet}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="flex-row gap-4 items-center p-4 rounded-[20px] bg-[rgba(213,212,212,0.815)]">
              <Goal />
              <Text className="text-[18px]  font-fredokaRegular">{goal}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
