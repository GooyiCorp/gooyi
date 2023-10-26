import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const width = 46
const height = 23
// -------------------------------------------------------------------------------------------------------------------------------------------
export default function Switch({
    state
}) {

    // ---------------------------------------------------------------- Value
    const [active, setActive] = useState(state)

    const switchTransition = useSharedValue(!state? 0: 1)

    // ---------------------------------------------------------------- Animated Style
    // Switch
    const translateSwitch = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: interpolate(switchTransition.value, [0,1], [0,width/2])}
            ]
        }
    })

    // Container
    const translateContainer = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(switchTransition.value, [0,1], [COLORS.borderGrey, COLORS.primary])
        }
    })

    // ---------------------------------------------------------------- handle
    const handleSwitch = () => {
        if (!active) {
            switchTransition.value = withTiming(1, {duration: 200})
            setActive(true)
        } else {
            switchTransition.value = withTiming(0, {duration: 200})
            setActive(false)
        }
    }
// -------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Pressable onPress={handleSwitch}>
        <Animated.View style={[styles.container, translateContainer]}>
            <Animated.View style={[styles.switch, translateSwitch]}></Animated.View>
        </Animated.View>
    </Pressable>
  )
}

// -------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: COLORS.borderGrey,
        borderRadius: height/2,
        justifyContent: 'center',
        padding: 0.1*height,
    },

    switch: {
        height: 0.8*height,
        width: 0.8*height,
        borderRadius: height/2,
        backgroundColor: COLORS.white
    }
})