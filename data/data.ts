import { AnimationObject } from "lottie-react-native";

export interface OnboardingAnimationData {
  id: number;
  type: "animation";
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

export interface AnswerOption {
  id: number;
  text: string;
}

export interface OnboardingQuestionData {
  id: number;
  type: "question";
  // Optionally include an animation for question screens:
  animation?: AnimationObject;
  question: string;
  answers: AnswerOption[];
  textColor: string;
  backgroundColor: string;
}

export type OnboardingScreenData =
  | OnboardingAnimationData
  | OnboardingQuestionData;

export const data: OnboardingScreenData[] = [
  {
    id: 1,
    type: "animation",
    animation: require("../assets/animations/Lottie1.json"),
    text: "Prva slika na onboarding ekranu",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    type: "animation",
    animation: require("../assets/animations/Lottie2.json"),
    text: "Druga slika na onboarding ekranu",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    type: "animation",
    animation: require("../assets/animations/Lottie3.json"),
    text: "Treca slika na onboarding ekranu",
    textColor: "#F7EE7F",
    backgroundColor: "#F1A66A",
  },
  // New question screens (with an optional animation if desired)
  {
    id: 4,
    type: "question",
    // Uncomment the line below if you want an animation for the question screen:
    // animation: require("../assets/animations/Lottie4.json"),
    question: "What is your favorite color?",
    answers: [
      { id: 1, text: "Red" },
      { id: 2, text: "Blue" },
      { id: 3, text: "Green" },
      { id: 4, text: "Yellow" },
    ],
    textColor: "#ffffff",
    backgroundColor: "#000000",
  },
  {
    id: 5,
    type: "question",
    // animation: require("../assets/animations/Lottie5.json"),
    question: "What is your favorite food?",
    answers: [
      { id: 1, text: "Pizza" },
      { id: 2, text: "Sushi" },
      { id: 3, text: "Burger" },
      { id: 4, text: "Pasta" },
    ],
    textColor: "#ffffff",
    backgroundColor: "#000000",
  },
  {
    id: 6,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question: "What is your hobby?",
    answers: [
      { id: 1, text: "Reading" },
      { id: 2, text: "Traveling" },
      { id: 3, text: "Gaming" },
      { id: 4, text: "Sports" },
    ],
    textColor: "#ffffff",
    backgroundColor: "#000",
  },
];

export default data;
