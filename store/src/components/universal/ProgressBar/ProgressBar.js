import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../helper/constants/colors'

export default function ProgressBar({
    progressValue,
    maxProgressValue,
    barWidth,
    barHeight,
    barContainerStyle,
    defaultColor1
}) {

    // Get Progress Percentage
    const progressPercentageValue = ( progressValue / maxProgressValue ) * 100

    // Animation
    const progress = useSharedValue(0)
    
    const progressAnimation = useAnimatedStyle(() => {
        return {
            width: progress.value,
            backgroundColor: interpolateColor(progress.value, [barWidth*0.25, barWidth*0.5, barWidth*0.75, barWidth], ['red', 'orange', 'yellow', 'green'])
        } 
    })

    // Animation Handler
    useEffect(() => {
        progress.value = withTiming(barWidth / 100 * progressPercentageValue, {duration: 200})
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
                barContainerStyle,
            ]}
        >
        {/* Inner Bar Container */}
        <Animated.View
            style={[
                {
                    height: barHeight,
                    width: 0,
                    borderRadius: barHeight/2,
                    // backgroundColor: COLORS.grey
                },
                progressAnimation
            ]}
        >
        </Animated.View>
        </View>
    </View>
)
}