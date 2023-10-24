import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import Icons, { icons } from './Icons'

const boxEdge = 20

export default function CheckBox({
style
}) {
    const [check, setCheck] = useState(false)
    
    const border = useSharedValue(0)
    const checkBox = useSharedValue(0)

    const handlePressIn = () => {
        if (!check) {
            border.value = withTiming(1, {duration: 100})
            checkBox.value = withDelay(200, withTiming(1, {duration: 100}))
            setCheck(true)
        } else {
            border.value = withTiming(0, {duration: 100})
            checkBox.value = withDelay(200, withTiming(0, {duration: 100}))
            setCheck(false)
        }
    }

    const transitionBoxContainer = useAnimatedStyle(() => {
        return {
            // transform: [
            //     {scale: interpolate(border.value, [0,0.5,1], [1,0.8,1])}
            // ],
            borderColor: interpolateColor(checkBox.value, [0,1], [COLORS.black, COLORS.primary])
        }
    })

    const transitionCheckBox = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: checkBox.value}
            ],
            opacity: checkBox.value
        }
    })

    return (
        <Pressable style={[styles.container, style]} onPressIn={handlePressIn}>

            <Animated.View style={[styles.boxContainer, transitionBoxContainer]}>
                
                <Animated.View style={[styles.checkBox, transitionCheckBox]}>
                    <Icons
                        icon={icons.FontAwesome5}
                        iconName={'check'}
                        iconSize={0.6*boxEdge}
                        iconColor={COLORS.white}
                    />
                </Animated.View>
                
            </Animated.View>

        </Pressable>
    )
}

const styles = StyleSheet.create({

    container: {
        height: boxEdge+10,
        width: boxEdge+10,
        justifyContent: 'center',
        alignItems: 'center',
        top: -5,
        left: -5,
    },

    boxContainer: {
        height: boxEdge,
        width: boxEdge,
        backgroundColor: COLORS.white,
        borderRadius: 0.3*boxEdge,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    checkBox: {
        height: boxEdge,
        width: boxEdge,
        borderRadius: 0.2*boxEdge,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})