import { Keyboard, StyleSheet, Text, View, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { TextInput } from 'react-native'
import RoundButton from '../components_universal/RoundButton'
import { icons } from '../components_universal/Icons'
import Animated, { interpolate, interpolateColor, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

export default function InputBox({
    style,
    label,
    dismiss,
    onFocusInput,
    onLeaveFocus,
    setOutput, 
    error,
    onChangeText,
    deleteError,

}) {

    // {/* -------------------------------------------------------------------- Value */}
    const [data, setData] = useState('')
    const [index, setIndex] = useState(2)
    const transitionVal = useSharedValue(0)
    const borderTransitionVal = useSharedValue(0)

    // {/* -------------------------------------------------------------------- handle Transition Start */}
    const handleTransition = () => {
        onFocusInput()
        transitionVal.value = withDelay(0, withTiming(1, {duration: 200}))
        if (!error) {
            borderTransitionVal.value = withDelay(0, withTiming(1, {duration: 200}))
        }
        setIndex(0)
    }

    useEffect(() => {
        if (error) {
            borderTransitionVal.value = withTiming(2, {duration: 200})
        } else {
            borderTransitionVal.value = withTiming(0, {duration: 0})
        }
    }, [dismiss, error])

    // {/* -------------------------------------------------------------------- handle lost Focus */}
    useEffect(() => {
        if (!data && dismiss) {
            transitionVal.value = withTiming(0, {duration: 100})
            setTimeout(() => {
                setIndex(2)
            }, 200)}
        //     console.log('test')
        // } else if (data && error) {
        //     borderTransitionVal.value = withTiming(-1, {duration: 200})
        // } else {
        //     borderTransitionVal.value = withTiming(0, {duration: 200})
        // }
        Keyboard.dismiss()
        }, [dismiss]);

    // {/* -------------------------------------------------------------------- handle Clear Button */}
    const handleClear = () => {
        setData('')
        setOutput('')
        transitionVal.value = withTiming(0, {duration: 200})
        borderTransitionVal.value = withTiming(0, {duration: 200})
        Keyboard.dismiss()
        onLeaveFocus()
        setTimeout(() => {
            setIndex(2)
        }, 200)
        deleteError()
    }

    const buttonTransition = useAnimatedStyle(() => {
            const opacity = interpolate(transitionVal.value, [0,1], [0,1])
            return {
                opacity: opacity
            }
    })

    const labelTransition = useAnimatedStyle(() => {
            const translateY = interpolate(transitionVal.value, [0,1], [0,20])
            return {
                transform: [
                    {translateY: translateY},
                ]
            }
    })

    const labelContainerTransition = useAnimatedStyle(() => {
        const translateY = interpolate(transitionVal.value, [0,1], [0,7])
        const scale = interpolate(transitionVal.value, [0,1], [1,0.8])
        return {
            transform: [
                {translateY: translateY},
                {scale: scale},
            ]
        }
    })

    const labelBgTransition = useAnimatedStyle(() => {
        const scaleX = interpolate(transitionVal.value, [0,1], [0,1])
        return {
            transform: [
                {scaleX: scaleX},
            ]
        }
    })

    const inputTransition = useAnimatedStyle(() => {
        const color = interpolateColor(borderTransitionVal.value, [0,1,2], [ COLORS.subPrimary02, COLORS.subPrimary, COLORS.primary])
        return {
            borderColor: color,
            zIndex: index
        }
    })

  return (
    <>
    <View style={[styles.boxContainer, style]}>

        {/* -------------------------------------------------------------------- Input Container */}
        <Animated.View style={[styles.inputContainer, inputTransition]}>
            <TextInput 
                style={[styles.input]} 
                onFocus={handleTransition}
                value={data}
                onChangeText={(e) => {onChangeText(e), setData(e)}}
                onEndEditing={() => {onLeaveFocus(), borderTransitionVal.value = withTiming(0, {duration: 200})}}
            />
        </Animated.View>

        {/* -------------------------------------------------------------------- Label */}
        <Animated.View style={[styles.labelContainer, labelContainerTransition]}>
            <Animated.Text style={[styles.label, labelTransition]}>{label}</Animated.Text>
            <Animated.View style={[styles.labelBg, labelBgTransition]}></Animated.View>
        </Animated.View>

        {/* -------------------------------------------------------------------- Delete Button */}
        <Animated.View style={[{position: 'absolute', right: 0}, buttonTransition]}>
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'close'}
                iconSize={30}
                iconColor={COLORS.grey}
                style={{backgroundColor: 'transparent'}}
                onPressButton={handleClear}
            />
        </Animated.View>

    </View>
    {/* <Pressable style={{height: height, width: width, zIndex: -1, position: 'absolute', backgroundColor: 'yellow'}} onPressIn={handleClose}></Pressable> */}
    </>
  )
}

const styles = StyleSheet.create({
    boxContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        height: 50,
        width: width-60,
        borderRadius: 16,
        //backgroundColor: 'yellow',
        paddingHorizontal: 20,
    },

    inputContainer: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.subPrimary02,
        zIndex:2,
    },

    label: {
        // position: 'absolute',
        // backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        // left: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        zIndex: 1
        // color: COLORS.subPrimary,
    },

    labelContainer: {
        position: 'absolute',
        //height: 50,
        //backgroundColor: COLORS.primary, 
        left: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    labelBg: {
        width: '100%',
        height: 20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -20
    }
})