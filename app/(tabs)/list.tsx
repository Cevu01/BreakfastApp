import { View, Text } from "react-native";
import React from "react";
import { useShoppingListQuery } from "@/queries/shoppingListQueries";
import { MeshGradientView } from "expo-mesh-gradient";

const progress = () => {
  const { data, isLoading, isError } = useShoppingListQuery();
  console.log(data);
  return (
    <MeshGradientView
      style={{ flex: 1 }}
      columns={3}
      rows={3}
      colors={[
        "#FFB3BA",
        "#FFDFBA",
        "#FFFFBA",
        "#BAFFC9",
        "#BAE1FF",
        "#D5BAFF",
        "#FFC8DD",
        "#C8E7FF",
        "#E2F0CB",
      ]}
      points={[
        [0.0, 0.0],
        [0.5, 0.0],
        [1.0, 0.0],
        [0.0, 0.5],
        [0.5, 0.5],
        [1.0, 0.5],
        [0.0, 1.0],
        [0.5, 1.0],
        [1.0, 1.0],
      ]}
    />
  );
};

export default progress;
