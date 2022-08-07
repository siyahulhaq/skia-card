import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  NavigationRoutes,
  Routes,
  StackNavigationProps,
} from "../../types/navigationRoutes";
import {
  BlurMask,
  Canvas,
  canvas2Polar,
  Circle,
  Fill,
  polar2Canvas,
  Shader,
  ShaderLib,
  Skia,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const r = (width - 32) / 2;

const c = vec(width / 2, height / 2);

const source = Skia.RuntimeEffect.Make(`
    uniform float cx;
    uniform float cy;
    uniform float r;
    ${ShaderLib.Math}
    ${ShaderLib.Colors}
    float quadraticIn(float t) {
        return t * t;
    }
    half4 main(vec2 uv) {
        float2 c = vec2(cx,cy);
        float mag = distance(uv, c);
        float theta = normalizeRad(canvas2Polar(uv,c).x);
        return hsv2rgb(vec3(theta/TAU, quadraticIn(mag/r), 1.0));
    }
`);

function hsvToRgb(h: number, s: number, v: number) {
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case -3:
      (r = p), (g = q), (b = v);
      break;
    case -2:
      (r = t), (g = p), (b = v);
      break;
    case -1:
      (r = v), (g = p), (b = q);
      break;
  }

  return [r * 255, g * 255, b * 255];
}

const polar2Color = (theta: number, polarRadius: number, radius: number) => {
  const TAU = Math.PI * 2;
  // get color with radius and angle of color wheel
  const h = theta / TAU;
  const s = polarRadius / radius;
  const v = 1.0;
  const rgb = hsvToRgb(h, s, v);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

type HueProps = StackNavigationProps<Routes, NavigationRoutes.Hue>;

const Hue: React.FC<HueProps> = () => {
  const translateX = useValue(c.x);
  const translateY = useValue(c.y);
  const color = useValue("rgb(255,255,255");
  const onTouch = useTouchHandler({
    onActive: (p) => {
      const polar = canvas2Polar(p, c);
      const { x, y } = polar2Canvas(
        { theta: polar.theta, radius: Math.min(polar.radius, r) },
        c
      );
      color.current = polar2Color(polar.theta, polar.radius, r);
      translateX.current = x;
      translateY.current = y;
    },
  });
  return (
    <Canvas style={styles.container} onTouch={onTouch}>
      <Fill color={color} />
      <Circle r={r} c={c}>
        <BlurMask blur={5} style="solid" />
        <Shader
          source={source!}
          uniforms={{
            r,
            cx: c.x,
            cy: c.y,
          }}
        />
      </Circle>
      <Circle r={10} cx={translateX} cy={translateY} color={color} />
    </Canvas>
  );
};

export default Hue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
