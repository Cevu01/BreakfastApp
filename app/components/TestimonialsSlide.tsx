// File: src/components/TestimonialsSlide.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import type { OnboardingTestimonialsData } from "@/data/data";

type Props = { item: OnboardingTestimonialsData };

export default function TestimonialsSlide({ item }: Props) {
  const { width } = useWindowDimensions();
  const PHOTO_SIZE = 46;

  return (
    <View
      style={{
        width,
        backgroundColor: item.backgroundColor,
        paddingBottom: 120,
        paddingTop: 70,
      }}
      className="flex-1 px-[16px]"
    >
      <Text
        className="text-[36px] font-fredokaMedium"
        style={{ color: item.textColor, paddingBottom: 10 }}
      >
        What our users say
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30, gap: 16 }}
        className="flex-col"
      >
        {item.testimonials.map((t, idx) => (
          <View
            key={idx}
            style={{ width: width * 0.9 }}
            className="bg-[#03334F] rounded-[24px] p-4 self-center"
          >
            <View className="flex-row items-center">
              <View
                style={{
                  width: PHOTO_SIZE,
                  height: PHOTO_SIZE,
                  borderRadius: 12,
                }}
                className="overflow-hidden mr-3"
              >
                {typeof t.photo === "number" ? (
                  <Image
                    source={t.photo}
                    style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
                    resizeMode="cover"
                  />
                ) : (
                  <t.photo width={PHOTO_SIZE} height={PHOTO_SIZE} />
                )}
              </View>
              <Text
                className="flex-1 text-[18px] font-fredokaRegular font-bold"
                style={{ color: "#fff" }}
              >
                {t.title}
              </Text>
            </View>
            <Text
              className="mt-2 text-[14px] font-fredokaRegular"
              style={{ color: "#D8EFFD" }}
            >
              {t.text}
            </Text>
            <Text
              className="font-fredokaLight"
              style={{ color: "#D8EFFD", paddingTop: 8 }}
            >
              {t.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
