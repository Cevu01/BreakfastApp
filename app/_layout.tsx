import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        {/* <StatusBar backgroundColor={"#fff"} /> */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboardingScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </>
  );
}
