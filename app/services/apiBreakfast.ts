// services/breakfast.ts
import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { getUserDay } from "@/helpers/getUserDate";

export async function getBreakfastWithProgress() {
  const user = await getAuthenticatedUser();

  // 1) user meta
  const { data: userData, error: userErr } = await supabase
    .from("users")
    .select("diet_type, start_date")
    .eq("uid", user.id)
    .single();
  if (userErr || !userData) throw new Error("User not found");

  const { diet_type, start_date } = userData;
  const currentDay = getUserDay(start_date); // int

  // 2) doručci (sa ingredientima — 1 upit)
  const { data: breakfasts, error: bfErr } = await supabase
    .from("breakfasts")
    .select(`*, breakfast_ingredients ( ingredients )`)
    .eq("diet_type", diet_type)
    .order("day_number", { ascending: true });
  if (bfErr || !breakfasts?.length) throw new Error("No breakfasts found");

  // 3) preferences
  const { data: prefs, error: prefErr } = await supabase
    .from("user_preferences")
    .select("preferences")
    .eq("users_id", user.id);
  if (prefErr) throw new Error("Unable to fetch user preferences");
  const disliked: string[] = prefs?.flatMap(p => p.preferences) || [];

  const hasDisliked = (b: any) => {
    const arr = b?.breakfast_ingredients?.[0]?.ingredients || [];
    return arr.some((ing: any) =>
      disliked.some((d) =>
        ing.name.toLowerCase().trim().includes(d.toLowerCase().trim())
      )
    );
  };

  // 4) izaberi doručak za danas (>= currentDay) bez disliked; fallback prvi bez disliked
  let chosen = breakfasts.find((b: any) => b.day_number >= currentDay && !hasDisliked(b));
  if (!chosen) chosen = breakfasts.find((b: any) => !hasDisliked(b));
  if (!chosen) throw new Error("No valid breakfast found for this user");

  const program_day: number = chosen.day_number;

  // 5) progres za taj program_day
  const { data: progress } = await supabase
    .from("breakfast_progress")
    .select("step_index,status,program_day,breakfast_id,finished_at,updated_at")
    .eq("user_uid", user.id)
    .eq("program_day", program_day)
    .maybeSingle();

  return { breakfast: chosen, progress }; // { breakfast, progress|null }
}
