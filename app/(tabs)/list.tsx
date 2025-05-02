// src/screens/ShoppingListScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgProps } from "react-native-svg";
import { useShoppingListQuery } from "@/queries/shoppingListQueries";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import { IngredientIcons, IngredientName } from "@/assets/svg/IngredientsSvgs";
import { findIconByName } from "@/assets/svg/IconMatchers";
import { getDisplayText } from "@/helpers/getDisplayText";

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
      toValue: 1.05,
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
          <View className="w-12 h-12 bg-gray-300 rounded-full mr-3" />
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
  // get current user ID
  const { user, isGettingCurrentUser } = useGetCurrentUserData();
  const userId = user?.[0]?.uid;
  const storageKey = userId ? `@shopping_checked_${userId}` : null;

  // fetch shopping list items
  const { data, isLoading: isListLoading, isError } = useShoppingListQuery();
  const items: ShoppingItem[] = Array.isArray(data) ? data : [];

  // local checked state, keyed by item index
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // 1) Load persisted checked state for this user
  useEffect(() => {
    if (!storageKey) return;
    AsyncStorage.getItem(storageKey)
      .then((raw) => {
        if (raw) setCheckedItems(JSON.parse(raw));
      })
      .catch(console.error);
  }, [storageKey]);

  // 2) Persist whenever checkedItems changes
  useEffect(() => {
    if (!storageKey) return;
    AsyncStorage.setItem(storageKey, JSON.stringify(checkedItems)).catch(
      console.error
    );
  }, [storageKey, checkedItems]);

  // show loader until both user and list data are ready
  if (isGettingCurrentUser || isListLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base">Error loading list.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6 pb-4 items-center">
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
                setCheckedItems((prev) => ({
                  ...prev,
                  [index]: !checked,
                }))
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ShoppingListScreen;
