// GoogleAuth.ts
import Constants from "expo-constants";
import { router } from "expo-router";
import { supabase } from "./supabase";
import { checkUserSession } from "@/helpers/checkUserSession";

// Determine if running in Expo Go
const isExpoGo = Constants.appOwnership === "expo";

// Conditionally load Google Sign-In module
let GoogleSignin, statusCodes;
if (!isExpoGo) {
  // Running in a dev client (or production build)
  ({
    GoogleSignin,
    statusCodes,
  } = require("@react-native-google-signin/google-signin"));
} else {
  // Stub implementations for Expo Go
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
    signOut: () => Promise.resolve(),
  };
  statusCodes = {
    SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
    IN_PROGRESS: "IN_PROGRESS",
    PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
  };
}

/** Configures Google Sign-In */
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      "738582966255-1k74bv4iknqll67um74ujetahee0m4bi.apps.googleusercontent.com",
    offlineAccess: true,
  });
  // console.log("GoogleSignin configured");
};

/** Signs in with Google and authenticates with Supabase */
export const signInWithGoogle = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("User is already signed in");
      router.push("/(tabs)/home");
      return;
    }
    // Check that Google Play Services are available (Android only)
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    // Start the sign-in process
    const userInfo = await GoogleSignin.signIn();
    // console.log("Google Sign-In Response:", userInfo);

    // Check if userInfo or its data is null (user cancelled sign-in)
    if (!userInfo || !userInfo.data) {
      console.warn("User cancelled sign in or no data was returned.");
      return;
    }

    // Extract idToken from the response
    const { idToken } = userInfo.data;

    if (!idToken) {
      console.warn("No ID token returned; user might have cancelled sign in.");
      return;
    }

    // Sign in to Supabase using the idToken
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) throw error;

    // console.log("✅ User signed in!", data);
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

/** Signs out the user from Google and Supabase */
export const signOutFromGoogle = async () => {
  try {
    // Proveri da li korisnik već ima aktivnu sesiju
    // Ista je provera kao na splah screenu, ali ovo osigurava da aplikacija ne pokusa duplo da uloguje korisnika
    const hasSession = await checkUserSession();
    if (hasSession) {
      console.log("User is already signed in");
      router.push("/(tabs)/home");
      return;
    }

    // Proceed to sign out if a session exists
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
    console.log("✅ User signed out");
    router.push("/");
  } catch (error: any) {
    console.error("❌ Google Sign-Out Error:", error);
  }
};
