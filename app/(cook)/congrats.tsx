import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";

const Congrats = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
      <Text className="text-[32px] font-fredokaMedium text-center mt-8">
        Bon Appétit! 🎉
      </Text>

      <Image
        source={require("../../assets/images/bonappetit.jpg")}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />

      <View className="flex-col items-center justify-center gap-10 px-4">
        <Text className="text-[16px] font-bdogroteskRegular text-center ">
          You’ve successfully finished the recipe. Time to enjoy your meal!
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
          className=" bg-[#41a4f0] px-6 py-3 rounded-[16px]"
        >
          <Text className="text-white text-[16px] font-fredokaMedium">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Congrats;
