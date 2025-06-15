import React from "react";
import { Stack } from "expo-router";

const CookLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="cook" options={{ headerShown: false }} />
      <Stack.Screen
        name="recipeSteps"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="timer"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="congrats"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CookLayout;
