import { useQuery } from "@tanstack/react-query";
import {
  getBreakfasts,
  getBreakfastWithDietType,
  getTodaysBreakfastForUser,
} from "../app/services/apiBreakfast";

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

export function useBreakfastDietType(diet_type: string) {
  const {
    isLoading: isBreakfastsDietTypeLoading,
    data: breakfastDietType,
    error,
  } = useQuery({
    queryKey: ["breakfastDietType", diet_type],
    queryFn: () => getBreakfastWithDietType(diet_type),
    enabled: !!diet_type, // samo pokreće ako postoji diet_type
  });
  return { isBreakfastsDietTypeLoading, breakfastDietType, error };
}

export function useGetTodaysBreakfastForUser() {
  const {
    isLoading: isTodaysBreakfastForUserLoading,
    data: todaysBreakfastForUser,
    error,
  } = useQuery({
    queryKey: ["todaysBreakfastForUser"],
    queryFn: () => getTodaysBreakfastForUser(),
  });
  return { isTodaysBreakfastForUserLoading, todaysBreakfastForUser };
}
