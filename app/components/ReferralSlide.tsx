// File: src/components/ReferralSlide.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import type { OnboardingReferralData } from "@/data/data";

type Props = {
  item: OnboardingReferralData;
  onSubmit: (code: string | null) => void;
};

export default function ReferralSlide({ item, onSubmit }: Props) {
  const { width } = useWindowDimensions();
  const [code, setCode] = useState("");

  return (
    <View
      style={[{ width, backgroundColor: item.backgroundColor }]}
      className="flex-1 justify-around  p-4"
    >
      <View>
        <Text
          className="text-[36px] font-fredokaMedium font-bold mb-2"
          style={{ color: item.textColor }}
        >
          {item.title}
        </Text>
        <Text className="text-[18px] font-fredokaRegular text-[#05598A] ">
          {item.subtitle}
        </Text>
      </View>
      <TextInput
        className="w-full bg-white border border-[#0A7BC2] rounded-[14px] p-5 mb-6 text-[18px] font-fredokaRegular"
        placeholder="Enter referral code"
        placeholderTextColor="#A9B2B1"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity
        className="w-full bg-[#03334F] rounded-[14px] p-5 items-center"
        onPress={() => onSubmit(code || null)}
      >
        <Text className="text-white text-[18px] font-fredokaRegular font-semibold">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
