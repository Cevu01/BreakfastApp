import { StyleSheet, View, FlatList, ViewToken } from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";
import data, { OnboardingScreenData } from "../data/data";
import CustomButton from "./components/CustomButton";
import RenderItem from "./components/RenderItem";
import ProgressBar from "./components/ProgressBar";

const OnboardingScreen = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingScreenData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  // State to store selected answers keyed by question id
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});

  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems &&
      viewableItems.length > 0 &&
      viewableItems[0].index !== null
    ) {
      flatListIndex.value = viewableItems[0].index;
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
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            x={x}
            onSelectAnswer={handleSelectAnswer}
            selectedAnswers={selectedAnswers}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <ProgressBar dataLength={data.length} x={x} />

      <View style={styles.bottomContainer}>
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 30,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});
