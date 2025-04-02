import { useQuery } from "@tanstack/react-query";
import { getShoppingListForNext7Days } from "../services/apiShoppingList";

export const useShoppingListQuery = () => {
  return useQuery({
    queryKey: ["shoppingList"],
    queryFn: getShoppingListForNext7Days,
  });
};
