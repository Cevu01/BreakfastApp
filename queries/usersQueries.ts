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
      console.log("Verovatno nisi ulogavan pa ne mozes da updatujes goal");
    },
  });

  return { isUpdatingGoal, updateGoal };
}

//Sa ovom funkcijom supabase mi automatiski vraca trenutno ulogovanog korisnika
//Ovo je korisno jer ne moramo da koristimo getAuthenticatedUser funkciju
export function useGetCurrentUserData() {
  const {
    isLoading: isGettingCurrentUser,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  return { isGettingCurrentUser, user, error };
}
