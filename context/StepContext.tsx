import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCurrentUserData } from "../queries/usersQueries";

interface StepContextType {
  step: number;
  setStep: (step: number) => void;
}

const StepContext = createContext<StepContextType>({
  step: 1,
  setStep: () => {},
});

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useGetCurrentUserData();
  const userId = user?.[0]?.uid;
  const storageKey = userId ? `@currentStep_${userId}` : "@currentStep";

  const [step, setStepState] = useState<number>(1);

  // Load persisted step on mount, per user
  useEffect(() => {
    const loadStep = async () => {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (saved !== null) {
          setStepState(parseInt(saved, 10));
        }
      } catch (e) {
        console.warn("Failed to load step:", e);
      }
    };
    loadStep();
  }, [storageKey]);

  // Persist step on change
  useEffect(() => {
    const saveStep = async () => {
      try {
        await AsyncStorage.setItem(storageKey, step.toString());
      } catch (e) {
        console.warn("Failed to save step:", e);
      }
    };
    saveStep();
  }, [storageKey, step]);

  const setStep = (newStep: number) => {
    setStepState(newStep);
  };

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => useContext(StepContext);
