import { OnboardingAnimationData } from "./data";

export const introSlides: OnboardingAnimationData[] = [
  {
    id: 1,
    type: "animation",
    animation: require("../assets/animations/Lottie4.json"),
    text: "What you eat for breakfast sets the tone for your entire day",
    textColor: "#3B3D00",
    backgroundColor: "#fdffb6",
  },

  {
    id: 2,
    type: "animation",
    animation: require("../assets/animations/Lottie10.json"),
    text: "Over 75% of people skip breakfast or choose unhealthy options.",
    textColor: "#034063",
    backgroundColor: "#bae4fd",
  },

  {
    id: 3,
    type: "animation",
    animation: require("../assets/animations/Lottie2.json"),
    text: "Let’s find out what kind of breakfast works best for you",
    textColor: "#4E2603",
    backgroundColor: "#fbc99d",
  },
];
