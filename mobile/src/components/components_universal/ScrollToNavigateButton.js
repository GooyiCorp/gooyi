import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from './Icons'
import Animated, { interpolate, runOnUI, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay } from 'react-native-reanimated'

export default function ScrollToNavigateButton({
    startValue,
    endvalue,
}) {
    const end = startValue.current + 100
    const x = useSharedValue()
    const animateWidth = useDerivedValue(() => {
        // console.log(endvalue.value)
        if (endvalue.value < end) {
            x.value = endvalue.value
        }
        // console.log(x.value);
        return {};
      });
    // const animation = useSharedValue(endvalue)
    // console.log(endvalue)
    // console.log(animation.value)
    // useEffect(() => {
    //     if (endvalue < startValue+110) {
    //         animation.value = endvalue;
    //     }
    // }, [endvalue])

    const translateButton = useAnimatedStyle(() => {
        // console.log(x.value);
        return {
            transform: [
                {scale: interpolate(x.value , [0, startValue.current, end], [0, 0,1])}
            ]
        }
    })
  return (
    <View style={styles.container}>
        <Animated.View style={[styles.innerContainer, translateButton]}>
            <Icons
                icon={icons.Ionicons}
                iconName={'ios-chevron-forward'}
                iconSize={35}
                iconColor={COLORS.mainBackground}
            />
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.mainBackground,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15
    },

    innerContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2
    }
})