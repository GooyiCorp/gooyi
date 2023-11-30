import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, useAnimatedProps, useDerivedValue, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import { H2 } from '../../../constants/text-style'
import { COLORS } from '../../../index/constantsindex'

const AnimatedTextComponent = Animated.createAnimatedComponent(TextInput)

export default function AnimatedText({
    num,
    delay,
}) {

    const [start, setStart] = useState(false)
    const animatedTextValue = useSharedValue(0)

    const animatedValue = useDerivedValue(() => {
        return num == 0? withSequence(withTiming(animatedTextValue.value, {duration: 180, easing: Easing.bezier(0.08, 0.25, 0.35, 0.84)} ), withDelay(20, withTiming(0, {duration: 0})) ) :
        withTiming(animatedTextValue.value, {duration: 200, easing: Easing.bezier(0.08, 0.25, 0.35, 0.84),} )
    })

    const animatedProps = useAnimatedProps(() => {
        return {
            text: `${Math.floor(animatedValue.value)}`,
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setStart(true)
            if (num == 0) {
                animatedTextValue.value = 9
            } else {
                animatedTextValue.value = num
            }
        }, delay)
    }, [num])

  return (
    <>
    {start && <AnimatedTextComponent animatedProps={animatedProps} editable={false} style={[H2, {color: COLORS.grey}]}/>}
    </>
  )
}

const styles = StyleSheet.create({})