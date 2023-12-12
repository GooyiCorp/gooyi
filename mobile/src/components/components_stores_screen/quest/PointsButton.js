import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../index/constantsindex'
import PointIcon from '../../components_universal/PointIcon'
import { T1, T2 } from '../../../constants/text-style'
import Icons, { icons } from '../../components_universal/Icons'
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { increasePoint, setPoint } from '../../../redux/slices/pointSlice'

export default function PointsButton({
    progressValue,
    maxProgressValue,
    points,
    handleDelete,
}) {

    const dispatch = useDispatch()

    const animationVal = useSharedValue(0)

    const animateButton = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animationVal.value, [0, 1], [COLORS.ivoryDark, COLORS.primary])
        }
    })

    const animateText = useAnimatedStyle(() => {
        return {
            color: interpolateColor(animationVal.value, [0, 1], [COLORS.grey, COLORS.mainBackground])
        }
    })

    const animateWave = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: progressValue == maxProgressValue? interpolate(animationVal.value, [0, 1], [0, 1]) : 0}
            ],
            opacity: interpolate(animationVal.value, [0, 0.9, 1], [0, 1, 0])
        }
    })

    const animateLock = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: interpolate(animationVal.value, [0, 0.1, 1], [1, 0, 0])}
            ]
        }
    })
    
    useEffect(() => {
        if (progressValue == maxProgressValue) {
            animationVal.value = withDelay( 300, withTiming(1, {easing: Easing.bezier(0, 0.1, 0.26, 1.02)}) )
        } else {
            animationVal.value = withTiming(0)
        }
    }, [progressValue])

    const handleAddPoint = () => {
        dispatch(increasePoint(points))
        handleDelete()
        // Thanh - delete Quest 
    } 

  return (
    <TouchableOpacity disabled={ progressValue == maxProgressValue? false : true } onPress={handleAddPoint}>
    <Animated.View style={[styles.container, animateButton]}>
        <Animated.View style={[styles.wave, animateWave]}></Animated.View>
        <Animated.View style={[styles.iconContainer, animateLock]}>
            <Icons 
                icon={icons.Ionicons}
                iconName={'ios-lock-closed'}
                iconSize={18}
                iconColor={COLORS.grey}
            />
        </Animated.View>
        <Animated.Text style={[T2 , {color: COLORS.white, fontFamily: 'RH-Medium', marginRight: 4}, animateText]}>+ {points}</Animated.Text>
        
    </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    
    container: {
        height: 34,
        width: 80,
        backgroundColor: COLORS.ivoryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30, 
        flexDirection: 'row'
    },

    wave: {
        height: 54,
        width: 100,
        borderRadius: 50,
        position: 'absolute',
        backgroundColor: COLORS.primary,
    },

    iconContainer: {
        width: 20, 
        height: 20, 
        // backgroundColor: 'yellow', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: -5,
        right: 2
    }

})