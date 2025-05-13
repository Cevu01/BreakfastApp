import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Time from "../../assets/svg/Time";
import { router } from "expo-router";

interface BreakfastCardProps {
  uri: string;
  name: string;
  time: number;
  loading: boolean;
}

const BreakfastCard: React.FC<BreakfastCardProps> = ({
  uri,
  name,
  time,
  loading,
}) => {
  const imgOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onImageLoad = () => {
    Animated.timing(imgOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
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
      <View className="absolute top-[10px] left-[10px] h-[40px] bg-[rgba(213,212,212,0.815)] justify-center px-4 rounded-[10px]">
        <View className="flex-row items-center justify-center gap-2">
          <Time />
          <Text className="text-black text-[16px] font-fredokaMedium">
            {time} min
          </Text>
        </View>
      </View>

      <View className="absolute bottom-[10px] left-[10px] right-[10px] h-[40px] bg-[rgba(213,212,212,0.815)] justify-center px-4 rounded-[10px]">
        <Text className="text-black text-[16px] font-fredokaMedium">
          {name}
        </Text>
      </View>

      {/* Pulsirajuće dugme */}
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
    </View>
  );
};

export default BreakfastCard;
