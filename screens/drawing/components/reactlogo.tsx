import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  BlurMask,
  Canvas,
  Circle,
  DashPathEffect,
  DiscretePathEffect,
  Extrapolate,
  Group,
  Oval,
  Paint,
  Path,
  RadialGradient,
  rect,
  Skia,
  SweepGradient,
  Transforms2d,
  useSharedValueEffect,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import {
  interpolate,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const oval = Skia.Path.Make();

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

oval.addOval(rct);

const c1 = "#3498db";
const c2 = "lightblue";

const Reactlogo = () => {
  const rValue = useSharedValue(0);

  useEffect(() => {
    rValue.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const skValue = useValue<Transforms2d>([
    {
      rotate: 0,
    },
    { scale: -1 },
  ]);

  const skValue2 = useValue<Transforms2d>([
    {
      rotate: 0,
    },
    { scale: -1 },
  ]);

  const skValue3 = useValue<number>(0);

  useSharedValueEffect(() => {
    skValue.current = [
      {
        rotate: interpolate(
          rValue.value,
          [0, 1],
          [0, Math.PI / 3],
          Extrapolate.CLAMP
        ),
      },
      { scale: -1 },
    ];
    skValue2.current = [
      {
        rotate: interpolate(
          rValue.value,
          [0, 1],
          [0, -Math.PI / 3],
          Extrapolate.CLAMP
        ),
      },
      { scale: -1 },
    ];
    skValue3.current = rValue.value;
  }, rValue);

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
        {/* <DiscretePathEffect deviation={3} length={10} /> */}
        <DashPathEffect intervals={[10, 5]} />
        <Path path={oval} end={skValue3} />
        <Group transform={skValue} origin={center}>
          <Path path={oval} end={skValue3} />
        </Group>
        <Group transform={skValue2} origin={center}>
          <Path path={oval} end={skValue3} />
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
