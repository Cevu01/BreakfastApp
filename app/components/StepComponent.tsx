// src/components/StepIndicator.tsx
import React from "react";
import { View, Text } from "react-native";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  lineColor?: string;
  circleSize?: number;
  style?: any;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  activeColor = "#41a4f0",
  inactiveColor = "#41a4f0",
  lineColor = "#41a4f0",
  circleSize = 40,
  style,
}) => (
  <View className="flex-row items-center" style={style}>
    {Array.from({ length: totalSteps }).map((_, idx) => {
      const step = idx + 1;
      const isCompleted = step < currentStep;
      const isActive = step === currentStep;

      return (
        <React.Fragment key={step}>
          {idx > 0 && (
            <View
              className="flex-1 h-[1.5px] mx-1.5 rounded-full"
              style={{ backgroundColor: isCompleted ? activeColor : lineColor }}
            />
          )}
          <View
            className="justify-center items-center border"
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: 12,
              borderColor:
                isActive || isCompleted ? activeColor : inactiveColor,
              backgroundColor:
                isActive || isCompleted ? activeColor : "transparent",
            }}
          >
            <Text
              className="text-[16px] font-fredokaMedium"
              style={{
                color: isActive || isCompleted ? "#fff" : inactiveColor,
              }}
            >
              {step}
            </Text>
          </View>
        </React.Fragment>
      );
    })}
  </View>
);

export default StepIndicator;
