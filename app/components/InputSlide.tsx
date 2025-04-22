// File: src/components/InputSlide.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import type { OnboardingAnimationData } from "@/data/data";

type Props = {
  item: OnboardingAnimationData & { id: 14 };
  name: string;
  setName: (val: string) => void;
  age: string;
  setAge: (val: string) => void;
  onSubmit: () => void;
  circleStyle: any;
};

export default function InputSlide({
  item,
  name,
  setName,
  age,
  setAge,
  onSubmit,
  circleStyle,
}: Props) {
  const { width } = useWindowDimensions();
  const isNameValid = /^[A-Za-z\s]+$/.test(name);
  const isSubmitDisabled = !name.trim() || !isNameValid || !age.trim();

  return (
    <View
      style={[{ width, backgroundColor: item.backgroundColor }]}
      className="flex-1 justify-around items-center px-4"
    >
      <Animated.View
        style={[
          {
            width,
            height: width,
            borderRadius: width / 2,
            backgroundColor: item.backgroundColor,
          },
          circleStyle,
        ]}
        className="absolute"
      />

      <Text
        className="text-[34px] font-fredokaMedium font-bold"
        style={{ color: item.textColor }}
      >
        Finally, a little more about you:
      </Text>

      <View className="w-full flex-col gap-4">
        <TextInput
          className="bg-white text-[18px] font-fredokaRegular rounded-[14px] border border-[#0A7BC2] w-full py-4 px-4"
          placeholder="Enter your name"
          placeholderTextColor="#A9B2B1"
          value={name}
          onChangeText={setName}
        />
        {name.length > 0 && !isNameValid && (
          <Text className="text-red-500 text-sm font-fredokaRegular">
            Name can only contain letters and spaces.
          </Text>
        )}
        <TextInput
          className="bg-white text-[18px] font-fredokaRegular rounded-[14px] border border-[#0A7BC2] w-full py-4 px-4"
          placeholder="Enter your age"
          placeholderTextColor="#A9B2B1"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <TouchableOpacity
        disabled={isSubmitDisabled}
        onPress={() => !isSubmitDisabled && onSubmit()}
        className={`py-5 w-full items-center justify-center rounded-[14px] ${
          isSubmitDisabled ? "bg-gray-400" : "bg-[#03334F]"
        }`}
      >
        <Text className="text-white text-[18px] font-fredokaRegular font-semibold">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
