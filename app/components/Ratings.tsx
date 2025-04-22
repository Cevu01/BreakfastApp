import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import type { OnboardingTestimonialsData } from "@/data/data";
import Ratings from "@/assets/svg/Ratings";
import SmallRatings from "@/assets/svg/SmallRatings";

type Props = { item: OnboardingTestimonialsData };

export default function RatingsSlide({ item }: Props) {
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
      {/* Title and large Ratings SVG */}
      <View className="items-center ">
        <Text
          className="text-[36px] pb-8 font-fredokaMedium"
          style={{ color: item.textColor }}
        >
          Give us a rating
        </Text>
        <View className="pb-4">
          <Ratings />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30, gap: 16 }}
        className="flex-col"
      >
        {item.testimonials.map((t, idx) => (
          <View
            key={idx}
            style={{ width: width * 0.9 }}
            className="bg-[#004364] rounded-[24px] p-4 self-center"
          >
            <View className="flex-row items-center mb-2">
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
                className="flex-1 text-[18px] font-fredokaMedium font-bold"
                style={{ color: "#bae4fd" }}
              >
                {t.title}
              </Text>
            </View>
            <Text
              className="mt-2 text-[14px] font-fredokaRegular"
              style={{ color: "#bae4fd" }}
            >
              {t.text}
            </Text>
            <View className="mt-4 flex-row items-center">
              <Text
                className="font-fredokaLight mr-2"
                style={{ color: "#bae4fd" }}
              >
                {t.name}
              </Text>
              <SmallRatings width={72} height={16} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
