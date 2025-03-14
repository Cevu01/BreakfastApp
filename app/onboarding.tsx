import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import data, { OnboardingData } from "../data/data";
import RenderItem from "./components/RenderItem";
import Pagination from "./components/Pagination";

const onboarding = () => {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);

  const flatlistIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
      </View>
    </View>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
  },
});
