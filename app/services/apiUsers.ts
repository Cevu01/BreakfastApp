import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { supabase } from "./supabase";

//UPDATE USER GOAL
export async function updateUserGoal(
  newGoal: string
): Promise<any[] | undefined> {
  const user = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("users")
    .update({ goal: newGoal })
    .eq("uid", user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("User goal could not be updated");
  }

  return data;
}
//UPDATE USER NAME AND AGE
export async function updateUserNameAndAge(
  name: string,
  age: number
): Promise<any[] | undefined> {
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from("users")
    .update({ name, age })
    .eq("uid", user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("User name and age could not be updated");
  }

  return data;
}

//UPDATE USER START DATE
export async function updateUserStartDate(): Promise<any[] | undefined> {
  const user = await getAuthenticatedUser();

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const { data, error } = await supabase
    .from("users")
    .update({ start_date: today })
    .eq("uid", user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("User start date could not be updated");
  }

  return data;
}

//UPDATE USER DIET TYPE
export async function updateUserDietType(
  newDietType: string
): Promise<any[] | undefined> {
  const user = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("users")
    .update({ diet_type: newDietType })
    .eq("uid", user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("User goal could not be updated");
  }

  return data;
}

//UPDATE USER ACTIVITY
export async function updateUserStreak(): Promise<void> {
  const user = await getAuthenticatedUser();
  if (!user || !user.id) {
    throw new Error("User is not authenticated");
  }

  // Dobavi trenutne podatke korisnika iz Supabase-a
  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("streak_count, last_active_date")
    .eq("uid", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching user data:", fetchError);
    return;
  }

  const today = new Date().toISOString().substring(0, 10); // UTC datum YYYY-MM-DD
  const lastActive = userData?.last_active_date;
  let newStreak = userData?.streak_count || 0;

  // Proveravamo da li se datum promenio
  if (lastActive === today) {
    console.log("Streak is already updated for today.");
    return; // Ako je već update-ovan, ne radimo ništa
  }

  // Proveravamo da li je korisnik bio aktivan juče
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().substring(0, 10);

  if (lastActive === yesterdayStr) {
    newStreak += 1; // Povećaj streak ako je bio aktivan juče
  } else {
    newStreak = 1; // Resetuj streak ako je korisnik preskočio dan
  }

  // Ažuriraj podatke u Supabase bazi
  const { error: updateError } = await supabase
    .from("users")
    .update({ last_active_date: today, streak_count: newStreak })
    .eq("uid", user.id);

  if (updateError) {
    console.error("Error updating streak:", updateError);
  } else {
    console.log("Streak successfully updated to:", newStreak);
  }
}

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

export async function getCurrentUserData() {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    throw new Error("User data could not be loaded");
  }

  return user;
}
