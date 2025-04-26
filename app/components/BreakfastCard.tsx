// src/components/BreakfastCard.tsx
import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface BreakfastCardProps {
  uri: string;
  name: string;
  loading: boolean;
}
const BreakfastCard: React.FC<BreakfastCardProps> = ({
  uri,
  name,
  loading,
}) => {
  const imgOpacity = useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    Animated.timing(imgOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#333" />
        </View>
      ) : (
        <Animated.Image
          source={{ uri }}
          style={[styles.image, { opacity: imgOpacity }]}
          resizeMode="cover"
          onLoad={onImageLoad}
        />
      )}

      {/* Simple semi-opaque black bar at the bottom */}
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

export default BreakfastCard;

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0,0,0,0.5)", // ← 50% black
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    // fontFamily: "FredokaMedium", // uncomment if you’ve loaded this font
  },
});
