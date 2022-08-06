import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    BlurMask,
  Canvas,
  Circle,
  Group,
  Oval,
  Paint,
  RadialGradient,
  rect,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const RECT_WIDTH = 300;
const RECT_HEIGHT = 120;

const center = { x: width / 2, y: (height - 100) / 2 };
const rct = rect(
  center.x - RECT_WIDTH / 2,
  center.y - RECT_HEIGHT / 2,
  RECT_WIDTH,
  RECT_HEIGHT
);

const c1= "#3498db";
const c2 = "lightblue";

const Reactlogo = () => {
  return (
    <Canvas style={styles.canva}>
      <Circle c={center} r={25}>
        <RadialGradient
          r={50}
          c={vec(center.x + 25, center.y)}
          colors={[c1, c2]}
        />
      </Circle>
      <Group style="stroke" strokeWidth={18}>
        <SweepGradient c={center} colors={[c1, c2, c1]} />
        <BlurMask style="inner" blur={10} />
        <Oval rect={rct} />
        <Group transform={[{ rotate: Math.PI / 3 }, {scale: -1 }]} origin={center}>
          <Oval rect={rct} />
        </Group>
        <Group transform={[{ rotate: -Math.PI / 3 }, {scale: -1 }]} origin={center}>
          <Oval rect={rct} />
        </Group>
      </Group>
    </Canvas>
  );
};

export default Reactlogo;

const styles = StyleSheet.create({
  canva: {
    flex: 1,
  },
});
