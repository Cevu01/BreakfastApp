import React, { useRef } from "react";
import {
  View,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { useGetFilteredBreakfast } from "@/queries/breakfastQueries";
import Back from "@/assets/svg/Back";
import { router } from "expo-router";
import Rating from "@/assets/svg/Rating";
import Timer from "@/assets/svg/Timer";
import Easy from "@/assets/svg/Easy";
import Servings from "@/assets/svg/Servings";
import Medium from "@/assets/svg/Medium";
import Hard from "@/assets/svg/Hard";

const Cook = () => {
  const { breakfast } = useGetFilteredBreakfast();
  const imgOpacity = useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    Animated.timing(imgOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // show loader while fetching
  if (!breakfast) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Animated.Image
        source={{ uri: breakfast.image }}
        className="w-full h-[350px]"
        style={{ opacity: imgOpacity }}
        resizeMode="cover"
        onLoad={onImageLoad}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-[50px] left-[20px] p-4  bg-[rgba(255,255,255,0.73)] justify-center  rounded-[14px]"
      >
        <Back />
      </TouchableOpacity>
      <View className="absolute top-[50px] right-[20px] p-3.5  bg-[rgba(255,255,255,0.73)] justify-center  rounded-[14px]">
        <View className="flex-row gap-2">
          <Rating />
          <Text className="text-[18px] font-fredokaMedium">
            {breakfast?.info?.rating}
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 bg-white rounded-t-[24px] -mt-6 px-[16px] pt-4 ">
        <View className="w-[40px] h-[4px] bg-[#666] mx-auto rounded-[4px]"></View>
        <Text className="text-[30px] font-fredokaMedium  py-8">
          {breakfast?.name}
        </Text>

        <View className="flex-row items-center justify-center gap-[18px]">
          {/* Timer Block */}
          <View className="min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center bg-[#C2E1FF] p-4 rounded-[18px]">
            <Timer />
            <Text className="text-[16px] text-[#004e9b] font-fredokaMedium">
              {breakfast?.info?.time} min
            </Text>
          </View>

          {/* Difficulty Block */}
          <View
            className={`min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center px-4 py-4 rounded-[18px] ${
              breakfast?.info?.difficulty === "medium"
                ? "bg-[#FEE9D7]"
                : breakfast?.info?.difficulty === "hard"
                ? "bg-[#ffc4c4]"
                : "bg-[#BFEDE0]"
            }`}
          >
            {breakfast?.info?.difficulty === "medium" ? (
              <Medium />
            ) : breakfast?.info?.difficulty === "hard" ? (
              <Hard />
            ) : (
              <Easy />
            )}
            <Text
              className={`text-[16px] font-fredokaMedium ${
                breakfast?.info?.difficulty === "medium"
                  ? "text-[#8A4B00]"
                  : breakfast?.info?.difficulty === "hard"
                  ? "text-[#8B0000]"
                  : "text-[#1f705b]"
              }`}
            >
              {breakfast?.info?.difficulty}
            </Text>
          </View>

          {/* Servings Block */}
          <View className="min-w-[100px] min-h-[120px] flex-col gap-2 items-center justify-center bg-[#D8CBF6] p-4 rounded-[18px]">
            <Servings />
            <Text className="text-[16px] text-[#391684] font-fredokaMedium">
              {breakfast?.info?.servings} serv
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cook;
