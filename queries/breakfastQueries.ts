import { useQuery } from "@tanstack/react-query";
import { getBreakfast } from "../app/services/apiBreakfast";

export function useGetBreakfast() {
  const {
    data: breakfast,
    isLoading: isBreakfastLoading,
    error,
  } = useQuery({
    queryKey: ["breakfast"],
    queryFn: () => getBreakfast(),
  });
  return { breakfast, isBreakfastLoading };
}
