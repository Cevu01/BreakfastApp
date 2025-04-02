import { useQuery } from "@tanstack/react-query";
import { getFilteredBreakfast } from "../services/apiBreakfast";

export function useGetFilteredBreakfast() {
  const {
    data: breakfast,
    isLoading: isBreakfastLoading,
    error,
  } = useQuery({
    queryKey: ["filtered-breakfast"],
    queryFn: getFilteredBreakfast,
    retry: false,
  });

  return { breakfast, isBreakfastLoading, error };
}
