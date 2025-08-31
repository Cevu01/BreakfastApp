import { supabase } from "./supabase";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";

type Status = "in_progress" | "completed";

export async function upsertBreakfastProgress(opts: {
  breakfast_id: number;   // IMPORTANT: bigint u bazi => number u TS
  program_day: number;
  step_index: number;
  status?: Status;
}) {
  const user = await getAuthenticatedUser();
  const payload = {
    user_uid: user.id,
    breakfast_id: opts.breakfast_id,
    program_day: opts.program_day,
    step_index: opts.step_index,
    status: opts.status ?? "in_progress",
    finished_at: (opts.status ?? "in_progress") === "completed" ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("breakfast_progress")
    .upsert([payload], { onConflict: "user_uid,program_day" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function finishBreakfast(opts: {
  breakfast_id: number;
  program_day: number;
  totalSteps: number;
}) {
  return upsertBreakfastProgress({
    breakfast_id: opts.breakfast_id,
    program_day: opts.program_day,
    step_index: opts.totalSteps,
    status: "completed",
  });
}
