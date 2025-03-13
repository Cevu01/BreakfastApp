import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgourndColor: string;
}

export const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    text: "Prva slika na onboarding ekranu",
    textColor: "#005b4f",
    backgourndColor: "#ffa3ce",
  },
  {
    id: 2,
    animation: require("../assets/animations/Lottie2.json"),
    text: "Druga slika na onboarding ekranu",
    textColor: "#1e2169",
    backgourndColor: "#bae4fd",
  },
  {
    id: 3,
    animation: require("../assets/animations/Lottie3.json"),
    text: "Treca slika na onboarding ekranu",
    textColor: "#F7EE7F",
    backgourndColor: "#F1A66A",
  },
];

export default data;
