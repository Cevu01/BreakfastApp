// context/StepContext.tsx
import React, { createContext, useContext, useState } from "react";

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
  const [step, setStep] = useState(1);

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => useContext(StepContext);
