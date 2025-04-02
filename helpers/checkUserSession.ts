import { supabase } from "@/app/services/supabase";

export async function checkUserSession(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return false;
    }

    if (data.session) {
      return true; // Korisnik je ulogovan
    }

    return false; // Nema aktivne sesije
  } catch (err) {
    console.error("Unexpected error checking session:", err);
    return false;
  }
}
