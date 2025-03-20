import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { supabase } from "./supabase";

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
export async function updateUserActivity(): Promise<void> {
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
