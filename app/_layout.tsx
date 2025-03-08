import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor={"#555555"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
