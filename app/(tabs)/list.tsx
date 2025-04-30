// src/screens/ShoppingListScreen.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { useShoppingListQuery } from "@/queries/shoppingListQueries";
import {
  IngredientIcons,
  IngredientName,
} from "../../assets/svg/IngredientsSvgs";
import { findIconByName } from "../../assets/svg/IconMatchers";
import { getDisplayText } from "../../helpers/getDisplayText";

export interface ShoppingItem {
  name: string;
  iconKey?: IngredientName;
  quantity?: number;
  unit?: string;
}

interface ListItemProps {
  item: ShoppingItem;
  checked: boolean;
  onToggle: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, checked, onToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  let Icon: React.ComponentType<SvgProps> | undefined;
  if (item.iconKey) {
    Icon = IngredientIcons[item.iconKey];
  } else {
    Icon = findIconByName(item.name);
  }

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }] }}
      className="overflow-hidden"
    >
      <Pressable
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="flex-row items-center gap-2 bg-[rgba(213,212,212,0.815)] rounded-[20px] p-4"
        android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: true }}
      >
        {Icon ? (
          <Icon />
        ) : (
          <View className="w-12 h-12 bg-gray-300 rounded-full mr-2" />
        )}
        <Text className="text-[16px] font-fredokaRegular">
          {getDisplayText(item)}
        </Text>
        <Text className="text-[16px] font-fredokaRegular ml-1">
          {item.name}
        </Text>
        <View className="flex-1" />
        <View className="flex-1" />
        <View
          className={
            `w-7 h-7 rounded-[8px] items-center justify-center ` +
            (checked ? "bg-green-800" : "bg-gray-400")
          }
        >
          {checked && <View className="w-3 h-3 bg-white rounded-[4px]" />}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const ShoppingListScreen: React.FC = () => {
  const { data, isLoading, isError } = useShoppingListQuery();
  const items: ShoppingItem[] = Array.isArray(data) ? data : [];
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (isLoading)
    return <Text className="flex-1 text-center mt-5">Loading...</Text>;
  if (isError)
    return <Text className="flex-1 text-center mt-5">Error loading list.</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6 pb-10 items-center">
        <Text className="text-[30px] font-fredokaMedium">Shopping List</Text>
      </View>

      <FlatList<ShoppingItem>
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item, index }) => {
          const checked = !!checkedItems[index];
          return (
            <ListItem
              item={item}
              checked={checked}
              onToggle={() =>
                setCheckedItems((prev) => ({ ...prev, [index]: !checked }))
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ShoppingListScreen;
