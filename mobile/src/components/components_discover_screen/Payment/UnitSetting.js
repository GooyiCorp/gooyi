import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../index/constantsindex'
import RoundButton from '../../components_universal/RoundButton'
import { icons } from '../../components_universal/Icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setDecreaseUnit, setIncreaseUnit } from '../../../redux/slices/cartSlice'

export default function UnitSetting() {

    const animation = useSharedValue(0)
    const dispatch = useDispatch()
    const unit = useSelector((state) => state.cart.unit)

    
    const translateButton = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [0, 0.5, 1], [0, 0, 1]),
            transform: [
                {scale: interpolate(animation.value, [0, 0.5, 1], [0, 0,1])}
            ]
        }
    })

    const translateContainer = useAnimatedStyle(() => {
        return {
            width: interpolate(animation.value, [0, 0.5, 1], [50, 120, 120])
        }
    })

    const handleAnimation = () => {
        animation.value = withTiming(1)
        animation.value = withDelay(2000, withTiming(0, {duration: 500}))
    }

    const handlePressContainer = () => {
        handleAnimation()
    }

    const handleDecrease = () => {
        handleAnimation()
        dispatch(setDecreaseUnit())
    }

    const handleIncrease = () => {
        handleAnimation()
        dispatch(setIncreaseUnit())
    }


  return (
    <Animated.View style={[styles.container, translateContainer]}>
        <Animated.View style={[translateButton]}>
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'ios-remove'}
                iconSize={20}
                iconColor={COLORS.white}
                style={{
                    height: 30,
                    width: 30,
                    backgroundColor: COLORS.grey,
                    margin: 0,
                    borderRadius: 10,
                    paddingLeft: 2,
                    transform: [
                        {scale: unit == 1? 0 : 1}
                    ]
                }}
                onPressButton={handleDecrease}
            />
        </Animated.View>

        <Pressable style={styles.valueBox} onPress={handlePressContainer}>
        <Text>{unit}</Text>
        </Pressable>

        <Animated.View style={[translateButton]}>
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'ios-add'}
                iconSize={20}
                iconColor={COLORS.white}
                style={{
                    height: 30,
                    width: 30,
                    backgroundColor: COLORS.grey,
                    margin: 0,
                    borderRadius: 10,
                    paddingLeft: 2
                }}
                onPressButton={handleIncrease}
            />
        </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    valueBox: {
        backgroundColor: COLORS.ivory,
        width: 50,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
})