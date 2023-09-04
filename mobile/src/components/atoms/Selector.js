import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, Easing } from 'react-native-reanimated'


// ---------------------------------------------------------------------------------------------------------------------

export default function Selector({
    pressValue
}) {

    // Value --------------------------------------------------------------- Transition

    const transitionValue = useSharedValue(0)
    const translateValue = 363-181

    // withTiming ---------------------------------------------------------- Transition

    transitionValue.value = withTiming(pressValue, {duration: 100, easing: Easing.bezier(0.45, 0.23, 0.78, 0.42)})

    // UseAnimatedStyle ---------------------------------------------------- Transition

    const translationSelectorBar = useAnimatedStyle(() =>{
        const translatePosition = interpolate(transitionValue.value, [0,1], [0, translateValue])
            return {
                transform:[
                    {translateX: translatePosition},
                ],
            }
        }
    )

    const translationOverlay = useAnimatedStyle(() =>{
        const translateRotation = interpolate(transitionValue.value, [0,1], [-15, 15])
        const translateX = interpolate(transitionValue.value, [0,1], [0, 43])
            return {
                transform:[
                    {translateX: translateX},
                    {rotate: translateRotation + 'deg'},
                ],
            }
        }
    )    

// ---------------------------------------------------------------------------------------------------------------------    
  return (
    <>
    <View style={styles.selectorContainer}>
        <Animated.View style={[styles.selectorBarOverlay, translationOverlay]}></Animated.View>
        <Animated.View style={[styles.selectorBar, translationSelectorBar]}></Animated.View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({

    selectorContainer: {
        height: 48,
        width: 363,
        //backgroundColor: 'grey',
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    selectorBar: {
        height: 48,
        width: 181,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        //opacity: 0.5

    },

    selectorBarOverlay: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        transform: [{rotate: '-15deg'}],
        left: 130,
        top: 20,
    },

})