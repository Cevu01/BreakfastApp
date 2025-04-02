import { supabase } from "@/services/supabase";

export async function getAuthenticatedUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id) {
    throw new Error("User not authenticated");
  }
  return data.user;
}
