import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { Alert, Platform } from "react-native";
import { supabase } from "./supabase";
import { checkUserSession } from "@/helpers/checkUserSession";

export const signInWithApple = async () => {
  if (Platform.OS !== "ios") return;

  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    const fullName =
      credential.fullName &&
      `${credential.fullName.givenName ?? ""} ${
        credential.fullName.familyName ?? ""
      }`.trim();

    if (fullName) {
      console.log("📛 Full name from Apple:", fullName);
    } else {
      console.log("⚠️ No full name received from Apple");
    }

    if (!credential.identityToken) {
      throw new Error("No identity token from Apple.");
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
    });

    if (error) {
      console.log("❌ Supabase Apple sign-in error:", error);
    } else {
      console.log("✅ Signed in with Apple:", data.user);
      router.push("/(tabs)/home");
    }
  } catch (e: any) {
    if (e.code === "ERR_REQUEST_CANCELED") {
      console.log("❌ User canceled Apple sign-in");
    } else {
      console.error("🚨 Error during Apple sign-in:", e);
    }
  }
};

export const signOutFromApple = async () => {
  try {
    const hasSession = await checkUserSession();

    if (!hasSession) {
      console.log("Nema aktivne sesije");
      Alert.alert("Nema aktivne sesije");
      return;
    }

    await supabase.auth.signOut();
    console.log("✅ User signed out");
    router.replace("/");
  } catch (error: any) {
    console.error("❌ Google Sign-Out Error:", error);
  }
};
