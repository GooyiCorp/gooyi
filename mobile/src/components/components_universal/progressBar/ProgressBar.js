import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../index/constantsindex'
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

export default function ProgressBar({
    progressValue,
    maxProgressValue,
    barWidth,
    barHeight,
}) {

    // Get Progress Percentage
    const progressPercentageValue = ( progressValue / maxProgressValue ) * 100

    // Animation
    const progress = useSharedValue(0)
    
    const progressAnimation = useAnimatedStyle(() => {
        return {
            width: progress.value,
            backgroundColor: progressValue == maxProgressValue? interpolateColor(progress.value, [barWidth*0.9, barWidth], [COLORS.grey, COLORS.primary]) : COLORS.grey,
        } 
    })

    // Animation Handler
    useEffect(() => {
        progress.value = withTiming(barWidth / 100 * progressPercentageValue, {easing: Easing.bezier(0, 0.1, 0.26, 1.02)})
    }, [progressValue])

return (
    <View>
        {/* Bar Container */}
        <View 
            style={[
                {
                    height: barHeight, 
                    width: barWidth, 
                    borderRadius: barHeight/2,
                    backgroundColor: COLORS.ivoryDark,
                    alignSelf: 'center',
                    overflow: 'hidden',
                },
            ]}
        >
        {/* Inner Bar Container */}
        <Animated.View
            style={[
                {
                    height: barHeight,
                    width: 0,
                    borderRadius: barHeight/2,
                    backgroundColor: COLORS.grey
                },
                progressAnimation
            ]}
        >
        </Animated.View>
        </View>
    </View>
)
}