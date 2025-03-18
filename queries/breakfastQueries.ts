import { useQuery } from "@tanstack/react-query";
import { getBreakfasts } from "../app/services/apiBreakfast";

export function useBreakfasts() {
  const {
    isLoading: isBreakfastsLoading,
    data: breakfasts,
    error,
  } = useQuery({
    queryKey: ["breakfasts"],
    queryFn: getBreakfasts,
  });
  return { isBreakfastsLoading, breakfasts, error };
}
