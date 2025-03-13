import { StyleSheet, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

import data from "../data/data";
import RenderItem from "./components/RenderItem";
const onboarding = () => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
