import { getUserDay } from "@/helpers/getUserDate";
import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";

// export async function getBreakfast() {
//   const user = await getAuthenticatedUser();
//   // 1. Fetch user info
//   const { data: userData, error: userError } = await supabase
//     .from("users")
//     .select("diet_type, start_date")
//     .eq("uid", user.id)
//     .single();

//   if (userError || !userData) {
//     throw new Error("User not found");
//   }

//   const { diet_type, start_date } = userData;
//   const currentDay = getUserDay(start_date);

//   // 2. Try to fetch breakfast for that exact day
//   const { data: breakfast, error: breakfastError } = await supabase
//     .from("breakfasts")
//     .select("*")
//     .eq("diet_type", diet_type)
//     .eq("day_number", currentDay)
//     .single();

//   // 3. Optional: If day_number exceeds max, wrap around to cycle
//   if (!breakfast || breakfastError) {
//     const { data: all, count } = await supabase
//       .from("breakfasts")
//       .select("id", { count: "exact", head: true })
//       .eq("diet_type", diet_type);

//     const totalDays = count ?? 60;
//     const wrappedDay = ((currentDay - 1) % totalDays) + 1;

//     const { data: fallbackBreakfast } = await supabase
//       .from("breakfasts")
//       .select("*")
//       .eq("diet_type", diet_type)
//       .eq("day_number", wrappedDay)
//       .single();

//     return fallbackBreakfast;
//   }

//   return breakfast;
// }

export async function getFilteredBreakfast() {
  const user = await getAuthenticatedUser();

  // 1. Fetch diet_type & start_date
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("diet_type, start_date")
    .eq("uid", user.id)
    .single();

  if (userError || !userData) {
    throw new Error("User not found");
  }

  const { diet_type, start_date } = userData;
  const currentDay = getUserDay(start_date);

  // 2. Fetch all breakfasts for that diet_type sorted by day_number
  const { data: breakfasts, error: bfError } = await supabase
    .from("breakfasts")
    .select("*")
    .eq("diet_type", diet_type)
    .order("day_number", { ascending: true });

  if (bfError || !breakfasts || breakfasts.length === 0) {
    throw new Error("No breakfasts found");
  }

  // 3. Fetch user's food preferences
  const { data: preferences, error: prefError } = await supabase
    .from("user_food_preferences")
    .select("ingredient")
    .eq("user_id", user.id);

  if (prefError) {
    throw new Error("Unable to fetch user preferences");
  }

  const dislikedIngredients = preferences?.map((p) => p.ingredient) || [];

  // 4. For each breakfast, check if it contains any disliked ingredients
  for (const breakfast of breakfasts) {
    const { data: ingredients, error: ingError } = await supabase
      .from("breakfast_ingredients")
      .select("ingredient")
      .eq("breakfast_id", breakfast.id);

    if (ingError) continue;

    const hasDisliked = ingredients?.some((ing) =>
      dislikedIngredients.includes(ing.ingredient)
    );

    if (!hasDisliked && breakfast.day_number >= currentDay) {
      return breakfast;
    }
  }

  // 5. Fallback: if no valid breakfast for currentDay+, return first available without disliked ingredients
  for (const breakfast of breakfasts) {
    const { data: ingredients, error: ingError } = await supabase
      .from("breakfast_ingredients")
      .select("ingredient")
      .eq("breakfast_id", breakfast.id);

    if (ingError) continue;

    const hasDisliked = ingredients?.some((ing) =>
      dislikedIngredients.includes(ing.ingredient)
    );

    if (!hasDisliked) {
      return breakfast;
    }
  }

  throw new Error("No valid breakfast found for this user");
}
