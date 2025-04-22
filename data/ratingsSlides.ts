import { OnboardingTestimonialsData } from "./data";

export const ratingsSlides: OnboardingTestimonialsData[] = [
  {
    id: 24, // make sure this is unique
    type: "testimonials", // reuse the same type
    backgroundColor: "#03334F",
    textColor: "#bae4fd",
    testimonials: [
      {
        photo: require("../assets/images/user1.jpg"),
        title: "Mornings Finally Make Sense!",
        text: "I used to skip breakfast all the time. This app helped me create meals I actually look forward to—fast, tasty, and fit my weight loss goals!",
        name: "Jasmina R.",
      },
      {
        photo: require("../assets/images/user2.jpg"),
        title: "Energized & Focused Till Lunch",
        text: "The personalized options are a game-changer. I feel full without feeling heavy, and I’ve stopped snacking before noon.",
        name: "Liam S.",
      },
      // …add as many as you need…
    ],
  },
];
