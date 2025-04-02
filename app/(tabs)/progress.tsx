import { View, Text } from "react-native";
import React from "react";
import { useShoppingListQuery } from "@/queries/shoppingListQueries";

const progress = () => {
  const { data, isLoading, isError } = useShoppingListQuery();
  console.log("Shopping lista:", data);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>progress</Text>
      {data?.map((item) => (
        <Text key={item.name}>{item.name}</Text>
      ))}
    </View>
  );
};

export default progress;
