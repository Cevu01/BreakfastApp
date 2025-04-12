import { OnboardingAnimationData } from "./data";

export const introSlides: OnboardingAnimationData[] = [
  {
    id: 1,
    type: "animation",
    animation: require("../assets/animations/Lottie4.json"),
    text: "What you eat for breakfast sets the tone for your entire day",
    textColor: "#005b4f",
    backgroundColor: "#DFFFE0",
  },

  {
    id: 2,
    type: "animation",
    animation: require("../assets/animations/Lottie2.json"),
    text: "Over 75% of people skip breakfast or choose unhealthy options.",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },

  {
    id: 3,
    type: "animation",
    animation: require("../assets/animations/Lottie3.json"),
    text: "Let’s find out what kind of breakfast works best for you",
    textColor: "#F7EE7F",
    backgroundColor: "#F1A66A",
  },
];
