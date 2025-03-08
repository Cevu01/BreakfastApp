import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-600">Welcome Vuk</Text>
      <Link href="/onboarding">OnBoarding</Link>
      <Link href={{ pathname: "/movies/[id]", params: { id: "avangers" } }}>
        Avengers Movie
      </Link>
    </View>
  );
}
