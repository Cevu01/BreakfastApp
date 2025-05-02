// app/(tabs)/profile.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import ProfileIcon from "../../assets/svg/Profile";
import DietTypeIcon from "../../assets/svg/DietType";
import GoalIcon from "../../assets/svg/Goal";

const DIET_OPTIONS = ["Vegan", "Keto", "Paleo"];
const GOAL_OPTIONS = ["Lose Weight", "Maintain Weight", "Gain Muscle"];

export default function Profile() {
  const { user, isGettingCurrentUser } = useGetCurrentUserData();
  const userName = user?.[0]?.name ?? "…";
  const userDiet = user?.[0]?.diet_type ?? DIET_OPTIONS[0];
  const userGoal = user?.[0]?.goal ?? GOAL_OPTIONS[1];

  const [selectedDiet, setSelectedDiet] = useState(userDiet);
  const [selectedGoal, setSelectedGoal] = useState(userGoal);

  const dietSheetRef = useRef<React.ElementRef<typeof RBSheet>>(null);
  const goalSheetRef = useRef<React.ElementRef<typeof RBSheet>>(null);

  if (isGettingCurrentUser) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-6">
        <Text className="text-[30px] text-center font-fredokaMedium pb-6">
          Account
        </Text>

        <View className="items-center gap-2 pt-6">
          <ProfileIcon />
          <Text className="text-[20px] font-fredokaMedium">{userName}</Text>
        </View>

        <View className="pt-[60px] gap-4">
          {/* Diet Type */}
          <TouchableOpacity onPress={() => dietSheetRef.current?.open()}>
            <View className="flex-row items-center gap-4 p-4 rounded-[20px] bg-[rgba(213,212,212,0.815)]">
              <DietTypeIcon />
              <Text className="text-[18px] font-fredokaRegular">
                {selectedDiet}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Goal */}
          <TouchableOpacity onPress={() => goalSheetRef.current?.open()}>
            <View className="flex-row items-center gap-4 p-4 rounded-[20px] bg-[rgba(213,212,212,0.815)]">
              <GoalIcon />
              <Text className="text-[18px] font-fredokaRegular">
                {selectedGoal}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Diet Bottom Sheet */}
      <RBSheet
        ref={dietSheetRef}
        height={410}
        openDuration={200}
        customStyles={{
          container: {
            backgroundColor: "#1F1F1F", // your custom bg color
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 12,
          },
          wrapper: { backgroundColor: "rgba(0,0,0,0.3)" },
        }}
      >
        <Text className="text-white text-[22px] font-fredokaMedium pt-4 pb-6">
          Select Diet Type
        </Text>
        {DIET_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => {
              setSelectedDiet(opt); // immediate UI update
              dietSheetRef.current?.close();
            }}
            className="py-3"
          >
            <Text
              className={`text-white bg-[#3D3D3D] p-4 rounded-[16px] text-[18px] ${
                selectedDiet === opt
                  ? "font-fredokaMedium"
                  : "font-fredokaRegular"
              }`}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </RBSheet>

      {/* Goal Bottom Sheet */}
      <RBSheet
        ref={goalSheetRef}
        height={410}
        openDuration={200}
        customStyles={{
          container: {
            backgroundColor: "#1F1F1F",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 12,
          },
          wrapper: { backgroundColor: "#0000004b" },
        }}
      >
        <Text className="text-white text-[22px]  font-fredokaMedium pt-4 pb-6">
          Select Goal
        </Text>
        {GOAL_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => {
              setSelectedGoal(opt);
              goalSheetRef.current?.close();
            }}
            className="py-3"
          >
            <Text
              className={`text-white bg-[#3D3D3D] p-4 rounded-[16px]  text-[18px] ${
                selectedGoal === opt
                  ? "font-fredokaMedium"
                  : "font-fredokaRegular"
              }`}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </RBSheet>
    </SafeAreaView>
  );
}
