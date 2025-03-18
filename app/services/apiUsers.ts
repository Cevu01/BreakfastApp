import { supabase } from "./supabase";

// const getUserUid = async (): Promise<string> => {
//   try {
//     const { data, error } = await supabase.auth.getSession();
//     if (error || !data.session?.user?.id) {
//       throw new Error("User not authenticated");
//     }
//     console.log("User ID:", data.session.user.id);
//     return data.session.user.id;
//   } catch (err) {
//     console.error("Error fetching user ID:", err);
//     throw err; // Propagiramo grešku dalje
//   }
// };
const getUserUid = async (): Promise<string> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user?.id) {
      throw new Error("User not authenticated");
    }
    console.log("User id:", data.session.user.id);
    console.log("Session ID length:", data.session.user.id.length);
    return data.session.user.id;
  } catch (err) {
    console.error("Error fetching user ID:", err);
    throw err; // Propagiramo grešku dalje
  }
};

export async function updateUserGoal(
  newGoal: string
): Promise<any[] | undefined> {
  const id = await getUserUid();

  if (!id) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("users")
    .update({ goal: newGoal })
    .eq("uid", id)
    .select();

  console.log("Supabase response:", { data, error });

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
