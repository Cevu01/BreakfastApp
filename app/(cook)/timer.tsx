import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const TimerScreen: React.FC = () => {
  // Grab raw params & coerce them
  const params = useLocalSearchParams();
  const durationParam =
    typeof params.duration === "string" ? params.duration : "0";
  const labelParam = typeof params.label === "string" ? params.label : "";

  const totalSeconds: number = parseInt(durationParam, 10);
  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{decodeURIComponent(labelParam)}</Text>
      <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
      {secondsLeft === 0 && (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  label: {
    fontSize: 24,
    fontFamily: "fredokaMedium",
    marginBottom: 16,
    textAlign: "center",
  },
  timer: {
    fontSize: 48,
    fontFamily: "fredokaMedium",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#41a4f0",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "fredokaMedium",
  },
});
