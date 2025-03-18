import { getUsers, updateUserGoal } from "@/app/services/apiUsers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  const { mutate: updateGoal, isPending: isUpdatingGoal } = useMutation({
    mutationFn: (newGoal: string) => updateUserGoal(newGoal),
    onSuccess: () => {
      console.log("User goal updated");
    },
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  return { isUpdatingGoal, updateGoal };
}

export function useUsers() {
  const {
    isLoading: isGettingUsers,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  return { isGettingUsers, users, error };
}
