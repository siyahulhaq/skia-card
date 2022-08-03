import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BackgroundGradient from './BackgroundGradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_WIDTH = WIDTH - 5;
const CARD_HEIGHT = HEIGHT - 5;

export default function App() {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const gesture = Gesture.Pan().onBegin(({x,y}) => {
    rotateX.value = interpolate(y, [0,CARD_HEIGHT], [10, -10], Extrapolate.CLAMP);
    rotateY.value = interpolate(x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP);
  }).onUpdate(({x, y}) => {
    rotateX.value = interpolate(y, [0,CARD_HEIGHT], [10, -10], Extrapolate.CLAMP);
    rotateY.value = interpolate(x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP);
  })
  .onFinalize(() => {
    rotateX.value = withTiming(0);
    rotateY.value = withTiming(0);
  })

  const restyle = useAnimatedStyle(() => {
    const rotateXValue = `${rotateX.value}deg`;
    const rotateYValue = `${rotateY.value}deg`;
    return {
      transform: [
        {
          perspective: 300,
        },
        {
          rotateX: rotateXValue,
        },
        {
          rotateY: rotateYValue,
        }
      ]
    }
  }, []);
  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT}/>
      <GestureDetector gesture={gesture}>
      <Animated.View style={[{
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#000',
        borderRadius: 20,
        zIndex: 300,
      }, restyle]}>
        <View
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '10%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 50,
                aspectRatio: 1,
                borderRadius: 25,
                backgroundColor: '#272F46',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 10,
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 25,
                  backgroundColor: '#272F46',
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 25,
                  backgroundColor: '#272F46',
                }}
              />
            </View>
          </View>
      </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
