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
