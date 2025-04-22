import type { OnboardingQuestionData } from "./data";
import Meat from "../assets/svg/Meat";
import Vegeterian from "../assets/svg/Vegeterian";
import Keto from "../assets/svg/Keto";
import Vegan from "../assets/svg/Vegan";
export const personalizationSlides: OnboardingQuestionData[] = [
  {
    id: 25,
    type: "question",
    question: "Do you have any dietary preferences or restrictions?",
    answers: [
      { id: 1, text: "No preferences", icon: Meat },
      { id: 2, text: "Vegeterain", icon: Vegeterian },
      { id: 3, text: "Keto", icon: Keto },
      { id: 4, text: "Vegan", icon: Vegan },
    ],
    textColor: "#03334F",
    backgroundColor: "#BAE4FD",
  },

  {
    id: 26,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question: "What would you love your breakfasts to help you with?",
    answers: [
      { id: 1, text: "Boost Energy & Focus", icon: Meat },
      { id: 2, text: "Eat Healthier", icon: Vegeterian },
      { id: 3, text: "Lose or Maintain Weight", icon: Keto },
      { id: 4, text: "Improve Mood & Clarity", icon: Vegan },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
    multiSelect: true,
  },
  {
    id: 27,
    type: "question",
    question: "Do you have any allergies, or food that you don't like?",
    answers: [
      { id: 1, text: "Milk" },
      { id: 2, text: "Oats" },
      { id: 3, text: "Meat" },
      { id: 4, text: "No preferences" },
      { id: 5, text: "Milk" },
      { id: 6, text: "Oats" },
      { id: 7, text: "Meat" },
      { id: 8, text: "No preferences" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
    multiSelect: true,
    showInput: true,
  },
];
