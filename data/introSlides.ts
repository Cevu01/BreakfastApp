import { OnboardingAnimationData } from "./data";

export const introSlides: OnboardingAnimationData[] = [
  {
    id: 1,
    type: "animation",
    animation: require("../assets/animations/Lottie1.json"),
    text: "What you eat for breakfast sets the tone for your entire day",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    type: "animation",
    animation: require("../assets/animations/Lottie2.json"),
    text: "Skipping breakfast doesn’t help you lose weight — it can actually slow your metabolism",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    type: "animation",
    animation: require("../assets/animations/Lottie3.json"),
    text: "Everyone’s body is different — yet most people eat the same breakfast every day",
    textColor: "#F7EE7F",
    backgroundColor: "#F1A66A",
  },
  // etc.
];
