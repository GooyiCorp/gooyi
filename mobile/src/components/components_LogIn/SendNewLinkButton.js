import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BigButton from './BigButton'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'

export default function SendNewLinkButton() {
    
    const iconAnimation = useSharedValue(0)

    const translateLeftIcon = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconAnimation.value, [0,1], [0,1]),
            transform: [
                {translateX: interpolate(iconAnimation.value, [0,1,2], [0, 0, 100])}
            ]
        }
    })

    const handlePress = () => {
        iconAnimation.value = withSequence(withTiming(1), withTiming(2), withDelay(1000, withTiming(0, {duration: 0})))
    }
  return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.buttonContainer}>
        <Text>Link erneut zusenden</Text>
        {/* Icon Left */}
        <Animated.View style={[styles.iconLeftContainer, translateLeftIcon]}>
            <Icons
                icon={icons.Ionicons}
                iconName={'ios-send-sharp'}
                iconSize={20}
                iconColor={'black'}
            />
        </Animated.View>
        {/* Icon Right */}
        <View style={styles.iconRightContainer}></View>

    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    buttonContainer: {
        height: 50,
        width: 250,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: COLORS.default,
        paddingHorizontal: 25, 
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
    },

    iconLeftContainer: {
        position: 'absolute',
        left: 25
    },

    iconRightContainer: {
        position: 'absolute',
        right: 25,
        width: 4,
        height: 20,
        backgroundColor: 'black'
    }

})