import { StyleSheet, View, FlatList, ViewToken } from "react-native";
import React, { useState } from "react";
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
  const { updateDietType } = useUpdateDietType();

  // State to store selected answers keyed by question id
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});

  console.log(selectedAnswers);

  //Videte sta cu sa ovom funkcijom da uradim?
  const submitAnswers = async () => {
    try {
      // Get the selected answer ID for question 11
      const answerId = selectedAnswers[11];

      if (answerId === null || answerId === undefined) {
        console.error("No answer selected for page 11.");
        return;
      }

      // Type guard: suzi data na OnboardingQuestionData
      const question = data.find(
        (item): item is OnboardingQuestionData =>
          item.id === 11 && item.type === "question"
      );

      if (!question) {
        console.error("Question data for page 11 not found.");
        return;
      }

      // Find the selected answer's text (explicitno anotiran tip parametra)
      const selectedOption = question.answers.find(
        (answer: AnswerOption) => answer.id === answerId
      );

      if (!selectedOption) {
        console.error("Selected answer not found in question data.");
        return;
      }

      // Send the text (not the number)
      // await updateUserDietType(selectedOption.text);
      updateDietType(selectedOption.text);
      console.log(`Updated diet type: ${selectedOption.text}`);
    } catch (error) {
      console.error("Error updating user diet type:", error);
    }
  };

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
          onSubmit={submitAnswers} // submitAnswers je funkcija koja šalje sve odgovore
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
