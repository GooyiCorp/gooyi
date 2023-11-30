import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, useAnimatedProps, useDerivedValue, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import { H2 } from '../../../constants/text-style'
import { COLORS } from '../../../index/constantsindex'

const AnimatedTextComponent = Animated.createAnimatedComponent(TextInput)

export default function AnimatedText({
    num,
    duration,
}) {

    const animatedTextValue = useSharedValue(0)

    const animatedValue = useDerivedValue(() => {
        return withTiming(animatedTextValue.value, {duration: duration, easing: Easing.bezier(0.08, 0.25, 0.35, 0.84)})
    })

    const animatedProps = useAnimatedProps(() => {
        return {
            text: `${Math.floor(animatedValue.value)}`,
        }
    })

    useEffect(() => {
        animatedTextValue.value = num
    }, [num])

  return (
    <AnimatedTextComponent animatedProps={animatedProps} editable={false} style={[H2, {color: COLORS.grey}]}/>
  )
}

const styles = StyleSheet.create({})