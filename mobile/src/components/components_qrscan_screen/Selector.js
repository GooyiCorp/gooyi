import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, Easing, interpolateColor } from 'react-native-reanimated'
import { moderateScale } from '../../helper/scale'


// ---------------------------------------------------------------------------------------------------------------------

export default function Selector({
    pressValue
}) {

    // Value --------------------------------------------------------------- Transition

    const transitionValue = useSharedValue(0)

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
        height: moderateScale(48,0),
        width: moderateScale(363,1),
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selectorLeftBar: {
        height: moderateScale(48,0),
        width: moderateScale(181,1),
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectorLeftBarOverlay: {
        height: moderateScale(60,1),
        width: moderateScale(60,1),
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        transform: [{rotate: '-15deg'}],
        left: moderateScale(130,1),
        top: moderateScale(20,0),
    },

    selectorRightBar: {
        height: moderateScale(48,0),
        width: moderateScale(181,1),
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectorRightBarOverlay: {
        height: moderateScale(60,1),
        width: moderateScale(60,1),
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
        transform: [{rotate: '15deg'}],
        right: moderateScale(130,1),
        top: moderateScale(20,0),
    },

    selectorTitleContainer: {
        height: moderateScale(48,0),
        width: moderateScale(181.5,1),
        //backgroundColor: 'green',

        justifyContent: 'center',
        alignItems: 'center',
      },

    title: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(15,1),
    },

})