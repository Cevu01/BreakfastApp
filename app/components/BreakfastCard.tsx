// components/BreakfastCard.tsx
import React from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Time from "../../assets/svg/Time";
import { router } from "expo-router";
import { usePulseAnimation } from "@/hooks/usePulseAnimation";
import { useFadeIn } from "@/hooks/useFadeIn";

interface BreakfastCardProps {
  uri: string;
  name: string;
  time: number;
  loading: boolean;
  statusLabel?: "Finished" | "Continue";
}

const BreakfastCard: React.FC<BreakfastCardProps> = ({
  uri,
  name,
  time,
  loading,
  statusLabel,
}) => {
  const pulseAnim = usePulseAnimation(1, 1.1, 600);
  const { opacity: imgOpacity, onLoad: onImageLoad } = useFadeIn(0, 1, 500);

  return (
    <TouchableWithoutFeedback onPress={() => router.push("/cook")}>
      <View className="w-full h-[240px] rounded-[20px] overflow-hidden relative">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="small" color="#333" />
          </View>
        ) : (
          <Animated.Image
            source={{ uri }}
            className="w-full h-full"
            style={{ opacity: imgOpacity }}
            resizeMode="cover"
            onLoad={onImageLoad}
          />
        )}

        <View className="absolute top-[10px] left-[10px] h-[40px] bg-[rgba(255,255,255,0.73)] justify-center px-4 rounded-[10px]">
          <View className="flex-row items-center justify-center gap-2">
            <Time />
            <Text className="text-black text-[16px] font-fredokaMedium">
              {time} min
            </Text>
          </View>
        </View>

        {/* Status badge (Finished / Continue) */}
        {statusLabel && (
          <View
            className={`absolute top-[10px] right-[120px] px-3 py-1 rounded-[10px] ${
              statusLabel === "Finished" ? "bg-[#4CAF50]" : "bg-[#41a4f0]"
            }`}
          >
            <Text className="text-white font-fredokaMedium">{statusLabel}</Text>
          </View>
        )}

        {/* Puls dugme */}
        <Animated.View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            transform: [{ scale: pulseAnim }],
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/cook")}
            className="h-[40px] bg-[#41a4f0] justify-center px-4 rounded-[10px]"
          >
            <Text className="text-white text-[16px] font-fredokaMedium">
              Cook it
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View className="absolute bottom-[10px] left-[10px] right-[10px] h-[40px] bg-[rgba(255,255,255,0.73)] justify-center px-4 rounded-[10px]">
          <Text className="text-black text-[16px] font-fredokaMedium">
            {name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BreakfastCard;
