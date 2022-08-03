import { StyleSheet } from "react-native";
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  useSharedValueEffect,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
interface BackgroundGradientProps {
  width: number;
  height: number;
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ width, height }) => {
  const canvaPadding = 40;
  const rValue = useSharedValue(0);
  const skValue = useValue(0);

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, { duration: 2000 }), -1, true);
  }, []);

  useSharedValueEffect(() => {
    skValue.current = rValue.value;
  }, rValue);

  return (
    <Canvas
      style={{
        width: width + canvaPadding,
        height: height + canvaPadding,
      }}
    >
      <RoundedRect
        x={canvaPadding / 2}
        y={canvaPadding / 2}
        width={width}
        height={height}
        color={"white"}
        r={20}
      >
        <SweepGradient
          c={vec((width + canvaPadding) / 2, (height + canvaPadding) / 2)}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
        <BlurMask style={"solid"} blur={skValue} />
      </RoundedRect>
    </Canvas>
  );
};

export default BackgroundGradient;

export { BackgroundGradient };
