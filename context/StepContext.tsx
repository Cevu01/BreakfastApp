import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [step, setStepState] = useState<number>(1);

  // Load persisted step on mount
  useEffect(() => {
    const loadStep = async () => {
      try {
        const saved = await AsyncStorage.getItem("@currentStep");
        if (saved !== null) {
          setStepState(parseInt(saved, 10));
        }
      } catch (e) {
        console.warn("Failed to load step:", e);
      }
    };
    loadStep();
  }, []);

  // Persist step on change
  useEffect(() => {
    const saveStep = async () => {
      try {
        await AsyncStorage.setItem("@currentStep", step.toString());
      } catch (e) {
        console.warn("Failed to save step:", e);
      }
    };
    saveStep();
  }, [step]);

  // Exposed setter
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
