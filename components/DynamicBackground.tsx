import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

const DynamicBackground = () => {
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  const circle3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animValue: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createAnimation(circle1Anim, 4000, 0);
    const animation2 = createAnimation(circle2Anim, 5000, 1000);
    const animation3 = createAnimation(circle3Anim, 6000, 2000);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  const circle1Transform = {
    transform: [
      {
        translateY: circle1Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
      {
        scale: circle1Anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.1, 1],
        }),
      },
    ],
    opacity: circle1Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.6, 0.3],
    }),
  };

  const circle2Transform = {
    transform: [
      {
        translateX: circle2Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 20],
        }),
      },
      {
        scale: circle2Anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.9, 1],
        }),
      },
    ],
    opacity: circle2Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.2, 0.5, 0.2],
    }),
  };

  const circle3Transform = {
    transform: [
      {
        translateY: circle3Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 25],
        }),
      },
      {
        translateX: circle3Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -15],
        }),
      },
    ],
    opacity: circle3Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.25, 0.4, 0.25],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle1, circle1Transform]} />
      <Animated.View style={[styles.circle2, circle2Transform]} />
      <Animated.View style={[styles.circle3, circle3Transform]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle1: {
    position: 'absolute',
    top: height * 0.15,
    right: width * 0.1,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.primary,
  },
  circle2: {
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.05,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.secondary,
  },
  circle3: {
    position: 'absolute',
    bottom: height * 0.25,
    right: width * 0.15,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.primary,
  },
});

export default DynamicBackground;