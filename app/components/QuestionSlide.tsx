// File: src/components/QuestionSlide.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import type { OnboardingQuestionData } from "@/data/data";
import RightArrow from "../../assets/svg/RightArrow";

type Props = {
  item: OnboardingQuestionData;
  index: number;
  onSelectAnswer?: (questionId: number, answerId: number | number[]) => void;
  selectedAnswers?: { [key: number]: number | number[] | null };
  flatListRef?: React.RefObject<any>;
  dataLength?: number;
};

const QuestionSlide: React.FC<Props> = ({
  item: q,
  index,
  onSelectAnswer,
  selectedAnswers,
  flatListRef,
  dataLength,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [otherText, setOtherText] = useState("");

  // Current selections (single or array)
  const current =
    selectedAnswers?.[q.id] ?? (q.multiSelect ? ([] as number[]) : null);
  const selections = Array.isArray(current)
    ? current
    : current != null
    ? ([current] as number[])
    : [];

  // Continue button enabled?
  const canContinue =
    selections.length > 0 || (q.showInput && otherText.trim().length > 0);

  // Toggle logic for answers
  const toggleAnswer = (ansId: number) => {
    if (!q.multiSelect) {
      onSelectAnswer?.(q.id, ansId);
      // Auto-advance for single choice
      setTimeout(() => {
        const next = index + 1;
        if (flatListRef && dataLength && next < dataLength) {
          flatListRef.current?.scrollToIndex({ index: next, animated: true });
        }
      }, 300);
      return;
    }

    // Multi-select
    const arr: number[] = Array.isArray(current)
      ? ([...current] as number[])
      : [];
    const idx = arr.indexOf(ansId);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(ansId);
    onSelectAnswer?.(q.id, arr);
  };

  return (
    <View
      style={[
        styles.container,
        { width: SCREEN_WIDTH, backgroundColor: q.backgroundColor },
      ]}
    >
      {/* Header + answers scroll area */}
      <View style={styles.content}>
        <Text
          className="font-fredokaMedium"
          style={[styles.questionText, { color: q.textColor }]}
        >
          {q.question}
        </Text>

        {q.showInput && (
          <TextInput
            value={otherText}
            onChangeText={setOtherText}
            placeholder="Gluten, peanut, bread, etc."
            placeholderTextColor="#8c8d8d"
            style={styles.input}
            className="text-[18px] font-fredokaRegular"
          />
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {q.answers.map((answer) => {
            const isSelected = selections.includes(answer.id);
            return (
              <TouchableOpacity
                key={answer.id}
                onPress={() => toggleAnswer(answer.id)}
                style={[
                  styles.answerButton,
                  {
                    backgroundColor: isSelected ? "#51B6F6" : "#D8EFFD",
                  },
                ]}
              >
                {answer.icon && (
                  <answer.icon
                    width={24}
                    height={24}
                    style={{ marginRight: 12 }}
                  />
                )}
                <Text
                  style={{
                    color: q.textColor,
                    fontSize: 18,
                  }}
                  className="font-fredokaRegular"
                >
                  {answer.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Continue button for multiSelect */}
      {q.multiSelect && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={!canContinue}
            onPress={() => {
              const next = index + 1;
              if (flatListRef && dataLength && next < dataLength) {
                flatListRef.current?.scrollToIndex({
                  index: next,
                  animated: true,
                });
              }
            }}
            style={[
              styles.continueButton,
              {
                backgroundColor: canContinue ? "#03334F" : "#888",
                borderRadius: 20,
              },
            ]}
          >
            <RightArrow />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 16,
    paddingBottom: 40, // bottom inset for non-scrolling space
  },
  content: {
    flex: 1,
  },
  questionText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0A7BC2",
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // ensures answers clear the button
  },
  answerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#0A7BC2",
    marginVertical: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 16,
  },
  continueButton: {
    padding: 12,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default QuestionSlide;
