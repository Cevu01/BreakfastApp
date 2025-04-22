import { AnimationObject } from "lottie-react-native";

import { introSlides } from "./introSlides";
import { questionSlides } from "./questionSlides";
import { resultSlides } from "./resultSlides";
import { inputSlides } from "./inputSlides";
import { badSlides } from "./badSlides";
import { goodSlides } from "./goodSlides";
import { calculatingSlides } from "./calculatingSlide";
import { testimonialsSlides } from "./testimonialsSlides";
import { SvgProps } from "react-native-svg";
import { benefitsSlides } from "./benefitsSlides";
import { personalizationSlides } from "./personalizationSlides";

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
  /** Optional SVG icon */
  icon?: React.FC<SvgProps>;
}
export interface Testimonial {
  photo: any;
  title: string;
  text: string;
  name: string;
}

export interface OnboardingQuestionData {
  id: number;
  type: "question";
  question: string;
  answers: AnswerOption[];
  textColor: string;
  backgroundColor: string;
  /** allow multi‑select? */
  multiSelect?: boolean;
  /** show an "Other..." text input */
  showInput?: boolean;
}
export interface OnboardingTestimonialsData {
  id: number;
  type: "testimonials";
  testimonials: Testimonial[];
  textColor: string;
  backgroundColor: string;
}
export interface OnboardingIllustrationData {
  id: number;
  type: "illustration";
  component: React.FC<SvgProps>;
  text: string;
  title: string;
  textColor: string;
  backgroundColor: string;
}

export type OnboardingScreenData =
  | OnboardingAnimationData
  | OnboardingQuestionData
  | OnboardingTestimonialsData
  | OnboardingIllustrationData;

export const data: OnboardingScreenData[] = [
  ...introSlides,
  ...questionSlides,
  ...calculatingSlides,
  ...resultSlides,
  ...inputSlides,
  ...badSlides,
  ...goodSlides,
  ...testimonialsSlides,
  ...personalizationSlides,
  ...benefitsSlides,
];

export default data;
