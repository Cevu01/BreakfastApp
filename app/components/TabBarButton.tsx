import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { icon } from "../constants/icon";

export default function TabBarButton({
  onPress,
  onLongPress,
  routeName,
  isFocused,
  color,
  label,
}: {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      {icon[routeName]({
        color: isFocused ? "#673ab7" : "#222",
      })}
      <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
