import { getUserDay } from "@/helpers/getUserDate";
import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { UserInterfaceIdiom } from "expo-constants";

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
    .from("user_preferences")
    .select("preferences")
    .eq("users_id", user.id);

  if (prefError) {
    throw new Error("Unable to fetch user preferences");
  }

  const dislikedIngredients = preferences?.flatMap((p) => p.preferences) || [];

  // 4. Filter breakfasts
  for (const breakfast of breakfasts) {
    const { data: ingredientsData, error: ingError } = await supabase
      .from("breakfast_ingredients")
      .select("ingredients")
      .eq("breakfast_id", breakfast.id);

    if (ingError || !ingredientsData || ingredientsData.length === 0) continue;

    const ingredientsArray = ingredientsData[0].ingredients || [];

    const hasDisliked = ingredientsArray.some((ing: any) =>
      dislikedIngredients.some((disliked) =>
        ing.name.toLowerCase().trim().includes(disliked.toLowerCase().trim())
      )
    );

    if (!hasDisliked && breakfast.day_number >= currentDay) {
      return breakfast;
    }
  }

  // 5. Fallback
  for (const breakfast of breakfasts) {
    const { data: ingredientsData, error: ingError } = await supabase
      .from("breakfast_ingredients")
      .select("ingredients")
      .eq("breakfast_id", breakfast.id);

    if (ingError || !ingredientsData || ingredientsData.length === 0) continue;

    const ingredientsArray = ingredientsData[0].ingredients || [];

    const hasDisliked = ingredientsArray.some((ing: any) =>
      dislikedIngredients.some((disliked) =>
        ing.name.toLowerCase().trim().includes(disliked.toLowerCase().trim())
      )
    );

    if (!hasDisliked) {
      return breakfast;
    }
  }

  throw new Error("No valid breakfast found for this user");
}
