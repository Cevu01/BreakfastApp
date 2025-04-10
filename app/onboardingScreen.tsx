import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useState, useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";
import data, {
  OnboardingScreenData,
  OnboardingQuestionData,
  AnswerOption,
} from "../data/data";
import CustomButton from "./components/CustomButton";
import RenderItem from "./components/RenderItem";
import ProgressBar from "./components/ProgressBar";
import { useUpdateDietType } from "@/queries/usersQueries";

const OnboardingScreen = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingScreenData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  // Track the currently visible slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // For the input slide (ID=14)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // For question slides: store selected answer for each question
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});

  const { updateDietType } = useUpdateDietType();

  // Animated scroll handler: update shared x-value as user scrolls
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // Track current index using viewable items
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems &&
        viewableItems.length > 0 &&
        viewableItems[0].index != null
      ) {
        setCurrentIndex(viewableItems[0].index);
        flatListIndex.value = viewableItems[0].index;
      }
    },
    [flatListIndex]
  );

  // Momentum scroll end: block forward swiping when no answer is selected (or input fields are blank)
  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const screenWidth = e.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(offsetX / screenWidth);

    const prevSlide = data[currentIndex];
    if (!prevSlide) return;

    // For question slides, allow forward swipe only if an answer is selected.
    if (prevSlide.type === "question") {
      const chosenAnswer = selectedAnswers[prevSlide.id];
      if (!chosenAnswer && newIndex > currentIndex) {
        // Snap back to current slide
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
        return;
      }
    }

    // For input slide (ID=14), if name or age is blank, block forward swiping.
    if (prevSlide.id === 14 && (!name.trim() || !age.trim())) {
      if (newIndex > currentIndex) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
        return;
      }
    }

    // Update current index if all conditions pass.
    setCurrentIndex(newIndex);
  };

  // Called when a question answer is tapped – stores the answer.
  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  // Example: updating diet type from question 11.
  const submitAnswers = async () => {
    try {
      const answerId = selectedAnswers[11];
      if (answerId === null || answerId === undefined) {
        console.error("No answer selected for page 11.");
        return;
      }
      const question = data.find(
        (item): item is OnboardingQuestionData =>
          item.id === 11 && item.type === "question"
      );
      if (!question) {
        console.error("Question data for page 11 not found.");
        return;
      }
      const selectedOption = question.answers.find(
        (ans: AnswerOption) => ans.id === answerId
      );
      if (!selectedOption) {
        console.error("Selected answer not found in question data.");
        return;
      }
      updateDietType(selectedOption.text);
      console.log(`Updated diet type: ${selectedOption.text}`);
    } catch (error) {
      console.error("Error updating user diet type:", error);
    }
  };

  // Handle submission on the input slide (ID=14)
  const handleSubmitNameAge = () => {
    if (!name.trim() || !age.trim()) {
      console.warn("Please fill in both Name & Age");
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  // Decide if we show the bottom arrow button.
  // Hide it for the input slide (ID=14) and any question slide.
  const currentSlide = data[currentIndex];
  let shouldHideArrowButton = false;
  if (currentSlide) {
    if (currentSlide.id === 14 || currentSlide.type === "question") {
      shouldHideArrowButton = true;
    }
  }

  // For the input slide, disable forward swipe if fields are blank.
  let canSwipe = true;
  if (currentSlide && currentSlide.id === 14) {
    if (!name.trim() || !age.trim()) {
      canSwipe = false;
    }
  }
  // For question slides, we disable manual forward swiping completely.
  if (currentSlide && currentSlide.type === "question") {
    canSwipe = false;
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            x={x}
            onSelectAnswer={handleSelectAnswer}
            selectedAnswers={selectedAnswers}
            name={name}
            setName={setName}
            age={age}
            setAge={setAge}
            onNameAgeSubmit={handleSubmitNameAge}
            flatListRef={flatListRef}
            dataLength={data.length}
          />
        )}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
        scrollEnabled={canSwipe}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <ProgressBar dataLength={data.length} x={x} />

      {!shouldHideArrowButton && (
        <View style={styles.bottomContainer}>
          <CustomButton
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            dataLength={data.length}
            x={x}
            onSubmit={submitAnswers}
          />
        </View>
      )}
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
