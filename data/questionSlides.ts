import { OnboardingQuestionData } from "./data";

export const questionSlides: OnboardingQuestionData[] = [
  {
    id: 4,
    type: "question",
    // Uncomment the line below if you want an animation for the question screen:
    // animation: require("../assets/animations/Lottie4.json"),
    question: "How many days a week do you skip breakfast?",
    answers: [
      { id: 1, text: "0–1 days" },
      { id: 2, text: "2–3 days" },
      { id: 3, text: "4-5 days" },
      { id: 4, text: "Almost every day" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 5,
    type: "question",
    // animation: require("../assets/animations/Lottie5.json"),
    question: "What’s your current go-to breakfast",
    answers: [
      { id: 1, text: "I skip it" },
      { id: 2, text: "Coffee only" },
      { id: 3, text: "Toast or cereal" },
      { id: 4, text: "Something homemade and balanced" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 6,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question: "Do you feel low energy or foggy before lunch?",
    answers: [
      { id: 1, text: "Yes, often" },
      { id: 2, text: "Sometimes" },
      { id: 3, text: "Not really" },
      { id: 4, text: "I’m not sure" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 7,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question:
      "How often do you grab something quick and unhealthy in the morning?",
    answers: [
      { id: 1, text: "Almost daily" },
      { id: 2, text: "A few times a week" },
      { id: 3, text: "Rarely" },
      { id: 4, text: "Never" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 8,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question: "How much time do you have for breakfast on a typical morning?",
    answers: [
      { id: 1, text: "Under 5 minutes" },
      { id: 2, text: "5–10 minutes" },
      { id: 3, text: "15+ minutes" },
      { id: 4, text: "It varies" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 9,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question:
      "Have you ever stuck to a breakfast routine for more than 1 week?",
    answers: [
      { id: 1, text: "Nope" },
      { id: 2, text: "Once or twice" },
      { id: 3, text: "A few times" },
      { id: 4, text: "Yes, I have a routine" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
  {
    id: 10,
    type: "question",
    // animation: require("../assets/animations/Lottie6.json"),
    question: "What’s most important to you in the morning?",
    answers: [
      { id: 1, text: "Feeling energized" },
      { id: 2, text: "Staying full until lunch" },
      { id: 3, text: "Quick and easy meals" },
      { id: 4, text: "Something tasty and healthy" },
    ],
    textColor: "#03334F",
    backgroundColor: "#bae4fd",
  },
];
