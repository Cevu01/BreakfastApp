import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    BDOGroteskRegular: require("../assets/fonts/BDOGrotesk-Regular.ttf"),
    BDOGroteskDemiBold: require("../assets/fonts/BDOGrotesk-DemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <StatusBar backgroundColor={"#fff"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
