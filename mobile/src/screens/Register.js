import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { api_url } from '../constants/api.js'
import { height, width } from '../constants/size.js';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated'
import { RedButton } from '../components/atoms/Button.js';

const Register = ({ onClose, homepage }) => {
    
    // -- Animation ----------------------------------------------------------------
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const closeButton = () => {
        translateY.value = withSpring(0, { damping: 15 })
        onClose()
    }
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, -height)
        })
        .onEnd(() => {
            if (translateY.value > -height / 1.3) {
                translateY.value = withSpring(0, { damping: 15 })
                runOnJS(onClose)()
            }
            else {
                translateY.value = withSpring(-height, { damping: 15 })
            }
        })
    const animatedStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [-height, -height + 50],
            [0, 25],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translateY.value }]
        }
    })
    useEffect(() => {
        translateY.value = withSpring(-height, { damping: 15 })
    }, [])
    return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={styles.line} />
            <Text style={styles.title}>Registrieren</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={moderateScale(24)} color="#4A4A4A" />
            </TouchableOpacity>

        </Animated.View>
    </GestureDetector>
    )
};

const styles = StyleSheet.create({
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 25,
        height: 1.5 * height,
        top: height,
        width: width
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(26),
        marginLeft: moderateScale(30),
        marginTop: moderateScale(30),
        alignSelf: 'flex-start',
    },

   
});


export default Register