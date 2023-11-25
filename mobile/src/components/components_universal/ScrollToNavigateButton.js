import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from './Icons'
import Animated, { interpolate, interpolateColor, runOnUI, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay } from 'react-native-reanimated'

export default function ScrollToNavigateButton({
    startValue,
    endvalue,
}) {

    const x = useDerivedValue(() => {
        const a = endvalue.value
        return a;
    });

    const w = useDerivedValue(() => {
        const b = startValue.value
        return b
    })



    const translateButton = useAnimatedStyle(() => {
        
        return {
            transform: [
                {scale: interpolate(x.value <= w.value+100 ? x.value : w.value+100, [ 0, w.value+99, w.value+100 ], [ 0.9, 0.9, 1 ])},
            ],
            backgroundColor: interpolateColor(x.value, [w.value+99, w.value+100], [COLORS.ivoryDark, COLORS.grey]),
            opacity: interpolate(x.value, [ 0, w.value, w.value+30], [ 0, 0, 1 ])
        }
    })

    const translateIcon = useAnimatedStyle(() => {
        return {
            transform: [
                {rotate: interpolate(x.value <= w.value+100 ? x.value : w.value+100, [ 0, w.value+30, w.value+100 ], [0, 0, 180 ]) + 'deg' },
            ],
            opacity: interpolate(x.value <= w.value+100 ? x.value : w.value+100, [ 0, w.value+99, w.value+100 ], [1, 1, 0 ]),
        }
    })

    const translateIcon2 = useAnimatedStyle(() => {
        return {
            transform: [
                {rotate: interpolate(x.value <= w.value+100 ? x.value : w.value+100, [ 0, w.value+30, w.value+100 ], [0, 0, 180 ]) + 'deg' },
            ],
            opacity: interpolate(x.value <= w.value+100 ? x.value : w.value+100, [ 0, w.value+99, w.value+100 ], [0, 0, 1 ]),
        }
    })
  return (
    // <View style={styles.container}>
        <Animated.View style={[styles.innerContainer, translateButton]}>
            <Animated.View style={[translateIcon]}>
                <Icons
                    icon={icons.MaterialCommunityIcons}
                    iconName={'arrow-left'}
                    iconSize={30}
                    iconColor={COLORS.grey}
                />
            </Animated.View>
            <Animated.View style={[translateIcon2, StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
                <Icons
                    icon={icons.MaterialCommunityIcons}
                    iconName={'arrow-left'}
                    iconSize={30}
                    iconColor={COLORS.mainBackground}
                />
            </Animated.View>
        </Animated.View>
    // </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        // backgroundColor: COLORS.mainBackground,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    innerContainer: {
        height: 44,
        width: 44,
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 5
    }
})