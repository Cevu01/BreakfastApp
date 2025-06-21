import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const { width } = Dimensions.get("window");

const TimerPage: React.FC = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const durationParam =
    typeof params.duration === "string" ? parseInt(params.duration, 10) : 1500;
  const labelParam =
    typeof params.label === "string"
      ? decodeURIComponent(params.label)
      : "Timer";

  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      router.back();
      return true;
    });
    return () => sub.remove();
  }, []);

  const format = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-black text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-black/70 text-xl font-bdogroteskDemiBold">
          {labelParam}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <View className="flex-1 items-center justify-center">
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={isPlaying}
          duration={durationParam}
          size={width * 0.7}
          strokeWidth={18}
          rotation="clockwise"
          trailColor="#c6dced"
          colors={["#1d93ee", "#41a4f0", "#6eb7ef"]}
          colorsTime={[durationParam, durationParam / 2, 0]}
          onComplete={() => {
            setIsPlaying(false);
            setFinished(true);
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <Text className="text-5xl pt-4 font-bdogroteskDemiBold text-black">
              {format(remainingTime)}
            </Text>
          )}
        </CountdownCircleTimer>

        {finished && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-8 bg-[#41a4f0] px-8 py-4 rounded-[18px]"
          >
            <Text className="text-white text-[14px] font-bdogroteskDemiBold">
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row justify-around px-12 mb-8">
        <TouchableOpacity
          onPress={() => {
            setIsPlaying(false);
            setTimerKey((k) => k + 1);
            setFinished(false);
          }}
          className="w-16 h-16 bg-white/20 rounded-full items-center justify-center"
        >
          <Text className="text-3xl text-black">✕</Text>
        </TouchableOpacity>

        {isPlaying ? (
          <TouchableOpacity
            onPress={() => setIsPlaying(false)}
            className="w-16 h-16 bg-white/20 rounded-full items-center justify-center"
          >
            <Text className="text-3xl text-black">⏸</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsPlaying(true)}
            className="w-16 h-16 bg-white/20 rounded-full items-center justify-center"
          >
            <Text className="text-3xl text-black">▶</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TimerPage;
