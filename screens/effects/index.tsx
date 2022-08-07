import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  NavigationRoutes,
  Routes,
  StackNavigationProps,
} from "../../types/navigationRoutes";
import {
  Blur,
  Canvas,
  ColorMatrix,
  Image,
  Paint,
  useImage,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const BW = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0];

const PURPLE = [
  1, -0.2, 0, 0, 0, 0, 1, 0, -0.1, 0, 0, 1.2, 1, 0.1, 0, 0, 0, 1.7, 1, 0,
];

type EffectsProps = StackNavigationProps<Routes, NavigationRoutes.Effects>;

const Effects: React.FC<EffectsProps> = () => {
  const webb = useImage(require("../../assets/webb2.jpeg"));
  const [selectedImage, setSelectedImage] = useState<null | number[]>(null);
  const [blur, setBlur] = useState(false);

  const toggleBlur = () => {
    setBlur(prev => !prev);
  }
  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {webb && (
          <Image
            image={webb}
            fit="cover"
            x={0}
            y={0}
            width={width}
            height={height}
          >
            {blur && <Blur blur={4} />}
            {selectedImage !== null && <ColorMatrix matrix={selectedImage} />}
          </Image>
        )}
      </Canvas>
      <Button title="Blur" onPress={toggleBlur} />
      <Button title="Black and White" onPress={() => {
        setSelectedImage(BW);
      }} />
      <Button title="Purple" onPress={() => {
        setSelectedImage(PURPLE);
      }} />
    </View>
  );
};

export default Effects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
