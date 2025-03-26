import { getUserDay } from "@/helpers/getUserDate";
import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";

export async function getBreakfast() {
  const user = await getAuthenticatedUser();
  // 1. Fetch user info
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

  // 2. Try to fetch breakfast for that exact day
  const { data: breakfast, error: breakfastError } = await supabase
    .from("breakfasts")
    .select("*")
    .eq("diet_type", diet_type)
    .eq("day_number", currentDay)
    .single();

  // 3. Optional: If day_number exceeds max, wrap around to cycle
  if (!breakfast || breakfastError) {
    const { data: all, count } = await supabase
      .from("breakfasts")
      .select("id", { count: "exact", head: true })
      .eq("diet_type", diet_type);

    const totalDays = count ?? 60;
    const wrappedDay = ((currentDay - 1) % totalDays) + 1;

    const { data: fallbackBreakfast } = await supabase
      .from("breakfasts")
      .select("*")
      .eq("diet_type", diet_type)
      .eq("day_number", wrappedDay)
      .single();

    return fallbackBreakfast;
  }

  return breakfast;
}
