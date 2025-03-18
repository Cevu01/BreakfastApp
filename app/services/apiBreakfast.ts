import { supabase } from "./supabase";

export async function getBreakfasts() {
  const { data, error } = await supabase.from("breakfasts").select("*");

  if (error) {
    console.error(error);
    throw new Error("Breakfasts could not be loaded");
  }

  return data;
}
