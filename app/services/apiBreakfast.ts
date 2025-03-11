import { supabase } from "./supabase";

export async function getBreakfasts() {
  const { data, error } = await supabase.from("breakfasts").select("*");

  if (error) {
    console.error(error);
    throw new Error("Breakfasts could not be loaded");
  }

  return data;
}

// export async function getBreakfasts() {
//   await new Promise((resolve) => setTimeout(resolve, 3000)); // Adds a 3-second delay

//   const { data, error } = await supabase.from("breakfasts").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Breakfasts could not be loaded");
//   }

//   return data;
// }
