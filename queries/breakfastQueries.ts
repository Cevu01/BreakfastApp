import { useQuery } from "@tanstack/react-query";
import { getFilteredBreakfast } from "../app/services/apiBreakfast";

export function useGetFilteredBreakfast() {
  const {
    data: breakfast,
    isLoading: isBreakfastLoading,
    error,
  } = useQuery({
    queryKey: ["filtered-breakfast"],
    queryFn: getFilteredBreakfast,
    staleTime: 1000 * 60 * 20,
    // retry: false,
  });

  return { breakfast, isBreakfastLoading, error };
}
