import { supabase } from "./supabase";

export async function getBreakfasts() {
  const { data, error } = await supabase.from("breakfasts").select("*");

  if (error) {
    console.error(error);
    throw new Error("Breakfasts could not be loaded");
  }

  return data;
}

export async function getBreakfastWithDietType(
  diet_type: string
): Promise<any[] | undefined> {
  const { data, error } = await supabase
    .from("breakfasts")
    .select()
    .eq("diet_type", diet_type);

  if (error) {
    console.error(error);
    throw new Error("Breakfast could not be fetched");
  }

  return data;
}
