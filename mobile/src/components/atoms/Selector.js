import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, Easing, interpolateColor } from 'react-native-reanimated'


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

    const translationLeftSelectorBar = useAnimatedStyle(() =>{
        const translatePosition = interpolate(transitionValue.value, [0,1], [0, 48])
            return {
                transform:[
                    {translateY: translatePosition},
                ],
            }
        }
    )

    const translationLeftOverlay = useAnimatedStyle(() =>{
        const translateX = interpolate(transitionValue.value, [0,1], [0, 48])
            return {
                transform:[
                    {translateY: translateX},
                    {rotate: '-15deg'},
                ],
            }
        }
    )    

    const leftTitleStyle = useAnimatedStyle(() =>{
        const leftTitleColor = interpolateColor(transitionValue.value, [0,1], ['#000000', '#ffffff'])
            return {
                color: leftTitleColor
            }
        }
    )

    const translationRightSelectorBar = useAnimatedStyle(() =>{
        const translatePosition = interpolate(transitionValue.value, [0,1], [48, 0])
            return {
                transform:[
                    {translateY: translatePosition},
                ],
            }
        }
    )

    const translationRightOverlay = useAnimatedStyle(() =>{
        const translateX = interpolate(transitionValue.value, [0,1], [48, 0])
            return {
                transform:[
                    {translateY: translateX},
                    {rotate: '15deg'},
                ],
            }
        }
    )    

    const rightTitleStyle = useAnimatedStyle(() =>{
        const rightTitleColor = interpolateColor(transitionValue.value, [0,1], ['#ffffff', '#000000'])
            return {
                color: rightTitleColor
            }
        }
    )


// ---------------------------------------------------------------------------------------------------------------------    
  return (
    <>
    <View style={styles.selectorContainer}>

        {/* Left Selector  */}
        <Animated.View style={[styles.selectorLeftBarOverlay, translationLeftOverlay]}></Animated.View>
        <Animated.View style={[styles.selectorLeftBar, translationLeftSelectorBar]}></Animated.View>

        {/* Right Selector */}
        <Animated.View style={[styles.selectorRightBarOverlay, translationRightOverlay]}></Animated.View>
        <Animated.View style={[styles.selectorRightBar,translationRightSelectorBar]}></Animated.View>

        {/* Title Style */}
        <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1}}>
            <View style={styles.selectorTitleContainer}><Animated.Text style={[styles.title, {fontFamily: pressValue? 'Roboto-Regular': 'Roboto-Medium'}, leftTitleStyle]}>Mein ID</Animated.Text></View>
            <View style={styles.selectorTitleContainer}><Animated.Text style={[styles.title, {fontFamily: pressValue? 'Roboto-Medium': 'Roboto-Regular'}, rightTitleStyle]}>Scanner</Animated.Text></View>
        </View>

    </View>
    </>
  )
}

const styles = StyleSheet.create({

    selectorContainer: {
        height: 48,
        width: 363,
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selectorLeftBar: {
        height: 48,
        width: 181,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectorLeftBarOverlay: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        transform: [{rotate: '-15deg'}],
        left: 130,
        top: 20,
    },

    selectorRightBar: {
        height: 48,
        width: 181,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectorRightBarOverlay: {
        height: 60,
        width: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        transform: [{rotate: '15deg'}],
        right: 130,
        top: 20,
    },

    selectorTitleContainer: {
        height: 48,
        width: 181.5,
        //backgroundColor: 'green',

        justifyContent: 'center',
        alignItems: 'center',
      },

    title: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },

})