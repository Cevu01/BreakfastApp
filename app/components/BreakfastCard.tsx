import React, { useRef } from "react";
import { View, Text, Animated, ActivityIndicator } from "react-native";

interface BreakfastCardProps {
  uri: string;
  name: string;
  loading: boolean;
}

const BreakfastCard: React.FC<BreakfastCardProps> = ({
  uri,
  name,
  loading,
}) => {
  const imgOpacity = useRef(new Animated.Value(0)).current;

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

      <View className="absolute bottom-[10px] left-[10px] right-[10px] h-[40px] bg-[rgba(213,212,212,0.815)] justify-center px-4 rounded-[10px]">
        <Text className="text-black text-[16px] font-fredokaMedium">
          {name}
        </Text>
      </View>
    </View>
  );
};

export default BreakfastCard;
