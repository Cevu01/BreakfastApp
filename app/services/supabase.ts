import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = "https://yvqhqwhkdyallubshrjt.supabase.co";
const SUPABASE_ANON_KEY: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cWhxd2hrZHlhbGx1YnNocmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NDcyMjgsImV4cCI6MjA1NzIyMzIyOH0.JyiSovoICR1EYSwGaNfGS2F24rv-4zq2l2uuJ7fRyG4";

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      storage: AsyncStorage,
    },
  }
);
