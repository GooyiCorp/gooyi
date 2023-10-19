import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'

export default function LoadingCircle() {
  const transition = useSharedValue(0)

  const transitionCirle = useAnimatedStyle(() => {
    return {
      //width: interpolate(transition.value, [0,1], [10, 30]),
      transform: [
        {translateX: interpolate(transition.value, [0,1], [-20,20])},
        {scale: interpolate(transition.value, [0,0.5,1], [1, 0.5, 1])}
      ],
      backgroundColor: interpolateColor(transition.value, [0,1], [COLORS.primary, COLORS.subPrimary])
    }
  }) 


  const handleTransition = () => {
    transition.value = withRepeat(withSequence(withTiming(1, {duration: 500}), withTiming(0, {duration: 500})), -1)
    
  }

  const handleReset = () => {
    transition.value = 0
  }

  return (
    <>
    <View style={styles.animationArea}>
      <Animated.View style={[styles.circle, transitionCirle]}></Animated.View>
    </View>
    <Button title='test' onPress={handleTransition}/>
    <Button title='reset' onPress={handleReset}/>
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
  }
})