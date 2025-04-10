import { StyleSheet, View, FlatList, ViewToken } from "react-native";
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

  // Track which page is currently visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // For the input slide (ID=14)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // For question-type slides
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});

  const { updateDietType } = useUpdateDietType();

  // Animated scrolling
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // Track currentIndex via onViewableItemsChanged
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems &&
        viewableItems.length > 0 &&
        viewableItems[0].index !== null
      ) {
        setCurrentIndex(viewableItems[0].index);
        flatListIndex.value = viewableItems[0].index;
      }
    },
    [flatListIndex]
  );

  // Called when user taps a question’s answer
  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  // Example: updating diet type from question 11
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

  // This handles “Submit” on the input slide
  const handleSubmitNameAge = () => {
    if (!name.trim() || !age.trim()) {
      console.warn("Please fill in both Name & Age");
      return;
    }
    // Move to next page
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  // Decide if we show the bottom container (arrow button).
  // We hide it for:
  //   * The input slide (ID=14)
  //   * Any "question" slide (i.e. item.type==="question")
  const currentSlide = data[currentIndex];
  let shouldHideArrowButton = false;
  if (currentSlide) {
    if (currentSlide.id === 14 || currentSlide.type === "question") {
      shouldHideArrowButton = true;
    }
  }

  // For the input slide, we also disable forward swiping if fields are blank
  let canSwipe = true;
  if (currentSlide && currentSlide.id === 14) {
    if (!name.trim() || !age.trim()) {
      canSwipe = false;
    }
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
            // We'll pass flatListRef & dataLength
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
