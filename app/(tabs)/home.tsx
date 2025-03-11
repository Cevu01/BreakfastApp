import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { getBreakfasts } from "../services/apiBreakfast";

const home = () => {
  useEffect(function () {
    getBreakfasts().then((data) => console.log(data));
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>home</Text>
    </View>
  );
};

export default home;
