import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'

const dotEdge = 10 

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- Ring Component
const Dot = ({ 
  delay, 
  style,
}) => {

  // Animation -----------------------------------------------------------------------------------------------------------
  const dot = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
      return {
          backgroundColor: interpolateColor(ring.value, [0, 0.5, 1], [COLORS.white, COLORS.lightGreen, COLORS.green]),
          opacity: ring.value,
          transform: [{scale: interpolate(ring.value, [0, 0.9, 1], [1, 1.05, 1])}]
      };
  });

  useEffect(() => {
      dot.value = withDelay(delay, withTiming(1, {duration: 300, easing: Easing.bezier(0.09, 0.71, 0.71, 1.14)}) )
  }, []);

  // Return -----------------------------------------------------------------------------------------------------------
  return (
      <Animated.View style={[styles.dot, ]} />
  )
};

export default function LoadingCircle() {

  return (
    <>
      <Dot delay={0}/>
    </>
  )
}

const styles = StyleSheet.create({

  animationArea: {
    height: 10,
    width: 30,
    borderRadius: 5,
    //backgroundColor: '#eeeeee',
    alignSelf: 'center',
    overflow: 'hidden'
  },

  circle: {
    height: 10,
    width: 30,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    left: 0,
    //opacity: 0.5
  },
  
  dot: {
    position: "absolute",
    width: dotEdge,
    height: dotEdge,
    borderRadius: dotEdge/2,
    backgroundColor: 'green'
  },  
})