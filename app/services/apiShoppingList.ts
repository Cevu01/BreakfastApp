import { getUserDay } from "@/helpers/getUserDate";
import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
}

export async function getShoppingListForNext7Days(): Promise<
  ShoppingListItem[]
> {
  const user = await getAuthenticatedUser();

  // 1. Uzimanje diet_type i start_date
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

  // 2. Uzimanje svih doručaka za diet_type
  const { data: breakfasts, error: bfError } = await supabase
    .from("breakfasts")
    .select("id, day_number")
    .eq("diet_type", diet_type)
    .order("day_number", { ascending: true });

  if (bfError || !breakfasts) {
    throw new Error("Error fetching breakfasts");
  }

  // 3. Uzimanje korisničkih preferenci
  const { data: preferences, error: prefError } = await supabase
    .from("user_preferences")
    .select("preferences")
    .eq("users_id", user.id);

  if (prefError) {
    throw new Error("Error fetching user preferences");
  }

  const dislikedIngredients: string[] =
    preferences?.flatMap((p) => p.preferences) || [];

  // 4. Pronalazak validnih 7 doručaka
  const totalDays = breakfasts.length;
  const selectedBreakfasts: Ingredient[][] = [];
  let dayOffset = 0;

  while (selectedBreakfasts.length < 7 && dayOffset < totalDays * 2) {
    const dayNum = ((currentDay - 1 + dayOffset) % totalDays) + 1;
    const breakfast = breakfasts.find((b) => b.day_number === dayNum);

    if (!breakfast) {
      dayOffset++;
      continue;
    }

    const { data: ingData, error: ingError } = await supabase
      .from("breakfast_ingredients")
      .select("ingredients")
      .eq("breakfast_id", breakfast.id)
      .single();

    if (ingError || !ingData?.ingredients) {
      dayOffset++;
      continue;
    }

    const ingredients: Ingredient[] = ingData.ingredients;

    const hasDisliked = ingredients.some((ing) =>
      dislikedIngredients.some(
        (disliked) => disliked.toLowerCase() === ing.name.toLowerCase()
      )
    );

    if (!hasDisliked) {
      selectedBreakfasts.push(ingredients);
    }

    dayOffset++;
  }

  // 5. Sabiranje sastojaka
  const ingredientMap: Record<string, { quantity: number; unit: string }> = {};

  for (const ingredients of selectedBreakfasts) {
    for (const ing of ingredients) {
      const key = ing.name.toLowerCase();

      if (ingredientMap[key]) {
        ingredientMap[key].quantity += ing.quantity;
      } else {
        ingredientMap[key] = {
          quantity: ing.quantity,
          unit: ing.unit,
        };
      }
    }
  }

  // 6. Vraćanje rezultata
  return Object.entries(ingredientMap).map(([name, { quantity, unit }]) => ({
    name,
    quantity,
    unit,
  }));
}
