import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-600">Welcome Vuk</Text>
      <Link className="font-bdogroteskDemiBold" href="(tabs)/home">
        Home
      </Link>
      <Link className="font-bdogroteskRegular" href="onboarding">
        Onboarding
      </Link>
    </View>
  );
}
