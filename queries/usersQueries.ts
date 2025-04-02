import {
  getUsers,
  updateUserDietType,
  updateUserGoal,
  updateUserStartDate,
  updateUserStreak,
} from "@/app/services/apiUsers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  const { mutate: updateGoal, isPending: isUpdatingGoal } = useMutation({
    mutationFn: (newGoal: string) => updateUserGoal(newGoal),
    onSuccess: () => {
      console.log("User goal updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log("Verovatno nisi ulogavan pa ne mozes da updatujes goal");
    },
  });

  return { isUpdatingGoal, updateGoal };
}

export function useUpdateStartDate() {
  const queryClient = useQueryClient();

  const { mutate: updateStartDate, isPending: isUpdatingStartDate } =
    useMutation({
      mutationFn: () => updateUserStartDate(),
      onSuccess: () => {
        console.log("User start date updated");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        console.log(
          "Verovatno nisi ulogavan pa ne mozes da updatujes start date"
        );
      },
    });

  return { updateStartDate, isUpdatingStartDate };
}
export function useUpdateDietType() {
  const queryClient = useQueryClient();

  const { mutate: updateDietType, isPending: isUpdatingDietType } = useMutation(
    {
      mutationFn: (newDietType: string) => updateUserDietType(newDietType),
      onSuccess: () => {
        console.log("User diet type updated");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        console.log(
          "Verovatno nisi ulogavan pa ne mozes da updatujes diet type"
        );
      },
    }
  );

  return { isUpdatingDietType, updateDietType };
}

export function useUpdateUserStreak() {
  const queryClient = useQueryClient();

  const { mutate: updateStreak, isPending: isUpdatingStreak } = useMutation({
    mutationFn: () => updateUserStreak(),
    onSuccess: () => {
      console.log("User streak updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log("Verovatno nisi ulogavan pa ne mozes da updatujes streak");
    },
  });

  return { updateStreak, isUpdatingStreak };
}
