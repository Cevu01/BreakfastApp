import AppleButton from "@/assets/svg/AppleButton";
import GoogleButton from "@/assets/svg/GoogleButton";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import {
  configureGoogleSignIn,
  signInWithGoogle,
  signOutFromGoogle,
} from "./services/GoogleAuth";
import { supabase } from "./services/supabase";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Configure Google Sign-In when the component mounts
  useEffect(() => {
    configureGoogleSignIn();
    // Check if a user session exists
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session on reload:", session);
      if (session) {
        router.push("/(tabs)/home");
      }
      setCheckingSession(false);
    };

    checkSession();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOutFromGoogle();
    setIsLoading(false);
  };

  // While checking session, display a spinner (or splash screen)
  if (checkingSession) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-600">Welcome Vuk</Text>
      <Link className="font-bdogroteskDemiBold mb-4" href="(tabs)/home">
        Home
      </Link>
      <Link className="font-bdogroteskRegular" href="onboarding">
        Onboarding
      </Link>
      <View className="gap-[8px] items-center justify-center mt-6">
        {isLoading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <>
            <TouchableOpacity onPress={handleSignIn}>
              <GoogleButton width={300} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
              <AppleButton width={300} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
