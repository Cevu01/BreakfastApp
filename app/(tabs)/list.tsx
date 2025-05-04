// src/screens/ShoppingListScreen.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useShoppingListQuery } from "@/queries/shoppingListQueries";
import { useGetCurrentUserData } from "@/queries/usersQueries";
import { IngredientIcons, IngredientName } from "@/assets/svg/IngredientsSvgs";
import { findIconByName } from "@/assets/svg/IconMatchers";
import { getDisplayText } from "@/helpers/getDisplayText";
import ListModal from "../components/ListModal";

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

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, checked, onToggle }) => {
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

    const Icon = item.iconKey
      ? IngredientIcons[item.iconKey]
      : findIconByName(item.name);

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
            className={`w-7 h-7 rounded-[8px] items-center justify-center ${
              checked ? "bg-[#1F1F1F]" : "bg-gray-400"
            }`}
          >
            {checked && <View className="w-3 h-3 bg-white rounded-[4px]" />}
          </View>
        </Pressable>
      </Animated.View>
    );
  }
);

const ShoppingListScreen: React.FC = () => {
  const { user, isGettingCurrentUser } = useGetCurrentUserData();
  const userId = user?.[0]?.uid;
  const storageKey = userId ? `@shopping_checked_${userId}` : null;
  const onboardingKey = userId ? `@shopping_onboarded_${userId}` : null;

  const { data, isLoading: isListLoading, isError } = useShoppingListQuery();
  const items: ShoppingItem[] = Array.isArray(data) ? data : [];

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showOnboarding, setShowOnboarding] = useState(false);

  const resetOnboarding = async () => {
    if (!onboardingKey) return;
    await AsyncStorage.removeItem(onboardingKey);
    setShowOnboarding(true);
  };

  useEffect(() => {
    if (!storageKey) return;
    AsyncStorage.getItem(storageKey)
      .then((raw) => raw && setCheckedItems(JSON.parse(raw)))
      .catch(console.error);
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    AsyncStorage.setItem(storageKey, JSON.stringify(checkedItems)).catch(
      console.error
    );
  }, [storageKey, checkedItems]);

  useEffect(() => {
    if (!onboardingKey) return;
    AsyncStorage.getItem(onboardingKey)
      .then((raw) => {
        if (!raw) setShowOnboarding(true);
      })
      .catch(console.error);
  }, [onboardingKey]);

  const handleOnboardDismiss = () => {
    if (onboardingKey) {
      AsyncStorage.setItem(onboardingKey, "true").catch(console.error);
    }
    setShowOnboarding(false);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: ShoppingItem; index: number }) => {
      const checked = !!checkedItems[item.name];
      return (
        <ListItem
          item={item}
          checked={checked}
          onToggle={() =>
            setCheckedItems((prev) => ({
              ...prev,
              [item.name]: !prev[item.name],
            }))
          }
        />
      );
    },
    [checkedItems]
  );

  if (showOnboarding) {
    return (
      <ListModal visible={showOnboarding} onDismiss={handleOnboardDismiss} />
    );
  }

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
      <TouchableOpacity
        onPress={resetOnboarding}
        className="absolute top-20 right-10 bg-red-500 px-2 py-1 rounded"
      >
        <Text className="text-white text-xs">Modal</Text>
      </TouchableOpacity>
      <View className="px-4 pt-6 pb-8 items-center">
        <Text className="text-[30px] font-fredokaMedium">Shopping List</Text>
      </View>

      <FlatList<ShoppingItem>
        data={items}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ShoppingListScreen;
