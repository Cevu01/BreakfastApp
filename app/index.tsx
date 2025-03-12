import AppleButton from "@/assets/svg/AppleButton";
import GoogleButton from "@/assets/svg/GoogleButton";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./services/supabase";
import { router } from "expo-router";
import Constants from "expo-constants";
import { useEffect } from "react";

export default function Index() {
  // Check if running in Expo Go
  const isExpoGo = Constants.appOwnership === "expo";
  console.log(isExpoGo);

  // Conditionally load Google Sign-In module
  let GoogleSignin, statusCodes;
  if (!isExpoGo) {
    // Running in a dev client (or production build), so load the module normally
    ({
      GoogleSignin,
      statusCodes,
    } = require("@react-native-google-signin/google-signin"));
  } else {
    // Running in Expo Go: provide stub implementations so the app doesn't crash
    console.warn(
      "Google Sign-In is not available in Expo Go. Build a development client to test this feature."
    );
    GoogleSignin = {
      configure: () => {},
      hasPlayServices: () => Promise.resolve(true),
      signIn: () =>
        Promise.reject(
          new Error(
            "Google Sign-In not available in Expo Go. Use a dev client build."
          )
        ),
      signOut: () => Promise.resolve(), // Provide a stub for signOut if needed
    };
    statusCodes = {
      SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
      IN_PROGRESS: "IN_PROGRESS",
      PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
    };
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "738582966255-1k74bv4iknqll67um74ujetahee0m4bi.apps.googleusercontent.com",
      offlineAccess: true,
    });
    console.log("GoogleSignin configured");
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Check that Google Play Services are available (Android only)
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Start the sign-in process
      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign-In Response:", userInfo);

      // Extract idToken from the response
      const { idToken } = userInfo.data;

      if (!idToken) {
        throw new Error("Google Sign-In failed. No ID token returned.");
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) throw error;

      console.log("✅ User signed in!");
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn("User cancelled the sign-in process.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn("Sign in operation already in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn("Google Play services not available or outdated.");
      } else {
        console.warn("An unknown error occurred during Google Sign-In.");
      }
    }
  };

  // Sign out function that logs the user out from Google and Supabase.
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();
      console.log("✅ User signed out");
      router.push("/onboarding");
    } catch (error: any) {
      console.error("❌ Google Sign-Out Error:", error);
    }
  };

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
        <TouchableOpacity onPress={signInWithGoogle}>
          <GoogleButton width={300} />
        </TouchableOpacity>
        {/* Sign-out button */}
        <TouchableOpacity onPress={signOut}>
          <AppleButton width={300} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
