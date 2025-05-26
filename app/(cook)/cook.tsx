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
  console.log(breakfast.info.rating);

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
      <View className="absolute top-[50px] right-[20px] p-4  bg-[rgba(255,255,255,0.73)] justify-center  rounded-[14px]">
        <Rating />
        <Text>{breakfast?.info?.rating}</Text>
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-[24px] -mt-6 p-4"></ScrollView>
    </View>
  );
};

export default Cook;
