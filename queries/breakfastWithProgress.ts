// queries/breakfastWithProgress.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBreakfastWithProgress } from "../app/services/apiBreakfast";
import { finishBreakfast, upsertBreakfastProgress } from "../app/services/breakfastProgress";

export function useGetBreakfastWithProgress() {
  // ključno: ključ veži za *danas* (getBreakfastWithProgress već bira doručak za taj dan)
  return useQuery({
    queryKey: ["breakfast-with-progress", "today"],
    queryFn: getBreakfastWithProgress,
    staleTime: 1000 * 60, // 1min (po želji)
  });
}

export function useUpsertBreakfastProgress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertBreakfastProgress,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["breakfast-with-progress", "today"] });
      const prev = qc.getQueryData<any>(["breakfast-with-progress", "today"]);
      if (prev) {
        qc.setQueryData(["breakfast-with-progress", "today"], {
          ...prev,
          progress: {
            ...(prev.progress ?? {}),
            program_day: vars.program_day,
            breakfast_id: vars.breakfast_id,
            step_index: vars.step_index,
            status: vars.status ?? "in_progress",
          },
        });
      }
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(["breakfast-with-progress", "today"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["breakfast-with-progress", "today"] });
    },
  });
}

export function useFinishBreakfast() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: finishBreakfast,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["breakfast-with-progress", "today"] });
    },
  });
}
