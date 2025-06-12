import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StepProvider } from "@/context/StepContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    BDOGroteskRegular: require("../assets/fonts/BDOGrotesk-Regular.ttf"),
    BDOGroteskDemiBold: require("../assets/fonts/BDOGrotesk-DemiBold.ttf"),
    FredokaLight: require("../assets/fonts/Fredoka-Light.ttf"),
    FredokaRegular: require("../assets/fonts/Fredoka-Regular.ttf"),
    FredokaMedium: require("../assets/fonts/Fredoka-Medium.ttf"),
    FredokaBold: require("../assets/fonts/Fredoka-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <StepProvider>
        <QueryClientProvider client={queryClient}>
          {/* <StatusBar backgroundColor={"#fff"} /> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboardingScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(cook)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </StepProvider>
    </>
  );
}
