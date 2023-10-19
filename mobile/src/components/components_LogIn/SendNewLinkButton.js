import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BigButton from './BigButton'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function SendNewLinkButton() {
    const animation = useSharedValue(0)
    const [press, setPress] = useState(false)

    const circleAnimation = useSharedValue(0)

    const handleAnimation = () => {

        animation.value = withTiming(1, {duration: 1000})
    }

    const transitionFlashView = useAnimatedStyle(() => {
        return {
            // transform: [
            //     {scale: interpolate(animation.value, [0,1], [1,1])}
            // ],
            height: interpolate(animation.value, [0,1], [50, 10]),
            width: interpolate(animation.value, [0,1], [width-60, 10])
        }
    })

  return (
    <Animated.View style>
        <View style={[styles.circle]}></View>
        <TouchableOpacity style={[styles.buttonContainer]} onPress={handleAnimation}>
            
            <Text style={[styles.title]}>Link erneut zusenden</Text>

            <Animated.View style={[styles.flashView, transitionFlashView]}></Animated.View>

        </TouchableOpacity>

    </Animated.View>
  )
}

const styles = StyleSheet.create({

    buttonContainer: {
        height: 50,
        width: width-60,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: COLORS.default,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        overflow: 'hidden',
    },

    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15
    },

    flashView: {
        height: 50,
        width: width-60,
        backgroundColor: COLORS.green,
        borderRadius: (width-60)/2,
        position: 'absolute',
    },

    circle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: COLORS.green,
        alignSelf: 'center'
    }

})