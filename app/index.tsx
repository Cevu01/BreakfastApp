import AppleButton from "@/assets/svg/AppleButton";
import GoogleButton from "@/assets/svg/GoogleButton";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { configureGoogleSignIn, signInWithGoogle } from "./services/GoogleAuth";
import { checkUserSession } from "@/helpers/checkUserSession";
import { supabase } from "./services/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";
import { signInWithApple } from "./services/AppleAuth";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [userInfo, setUserInfo] = useState<null | {
    email: string;
    id: string;
    provider: string;
  }>(null);

  // Proveri da li postoji session kad se app otvori
  useEffect(() => {
    configureGoogleSignIn();

    const verifySession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session) {
        console.log("🔐 User already logged in:", session.user.email);
        setUserInfo({
          email: session.user.email!,
          id: session.user.id,
          provider: session.user.app_metadata?.provider ?? "unknown",
        });
        router.push("/(tabs)/home");
      }
      setCheckingSession(false);
    };

    verifySession();
  }, []);

  //GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  //APPLE SIGN IN
  const handleAppleSignIn = async () => {
    setIsLoading(true);
    await signInWithApple();
    setIsLoading(false);
  };

  if (checkingSession) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-5xl text-blue-600 mb-4">Welcome Vuk</Text>

      {userInfo && (
        <View className="mb-6 items-center">
          <Text className="text-lg">📧 Email: {userInfo.email}</Text>
          <Text className="text-sm">🆔 ID: {userInfo.id}</Text>
          <Text className="text-sm">🔗 Provider: {userInfo.provider}</Text>
        </View>
      )}

      <Link className="font-bdogroteskDemiBold mb-4" href="(tabs)/home">
        Home
      </Link>

      <Link className="font-bdogroteskRegular mb-6" href="onboardingScreen">
        Onboarding
      </Link>

      <View className="gap-[8px] items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <>
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <GoogleButton width={300} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAppleSignIn}>
              <AppleButton width={300} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
