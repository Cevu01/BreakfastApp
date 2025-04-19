import { OnboardingTestimonialsData } from "./data";

export const testimonialsSlides: OnboardingTestimonialsData[] = [
  {
    id: 23,
    type: "testimonials",
    backgroundColor: "#bae4fd",
    textColor: "#03334F",
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
      {
        photo: require("../assets/images/user3.jpg"),
        title: "Like Having a Nutritionist in My Pocket",
        text: "It’s so easy to use. I just enter my goals and preferences, and boom—three breakfast ideas that actually fit my lifestyle.",
        name: "Sofia T.",
      },
      {
        photo: require("../assets/images/user5.jpg"),
        title: "Perfect for My Sensitive Stomach",
        text: "I have gluten sensitivity, and this app gives me amazing meal ideas I never would’ve thought of. My digestion has improved a lot.",
        name: "Ethan W.",
      },
      {
        photo: require("../assets/images/user4.jpg"),
        title: "Small Habit, Big Results",
        text: "After just 2 weeks of using this app, I feel better, more organized, and even lost a little weight. Totally worth it.",
        name: "Ava L.",
      },
    ],
  },
];
