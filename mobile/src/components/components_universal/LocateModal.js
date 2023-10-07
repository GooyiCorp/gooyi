import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withSpring, runOnJS, useAnimatedStyle, interpolate, Extrapolate, withTiming, Easing } from 'react-native-reanimated'
import NavBackButton from '../atoms/NavBackButton'
import { COLORS } from '../../index/constantsindex'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LocateModal({
    onClose
}) {

// Animation -----------------------------------------------------------------------------------------------------------

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const closeButton = () => {
        translateY.value = withSpring(0, {damping: 15})
        onClose()
    }

    // handle Gesture -------------------------------------------------
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value}
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y 
        translateY.value = Math.max(translateY.value, -0.5*height)
    })
    .onEnd(() => {
        if (translateY.value > -(0.5*height)/2.5) {
            translateY.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.49, 1.19, 0.79, 1.02)})
            runOnJS(onClose)()
        }
        else {
            translateY.value = withTiming(-0.4*height, {duration: 400,
                easing: Easing.bezier(0.49, 1.19, 0.79, 1.02)})
        }
    })

    // handle Animation ------------------------------------------------
        // background Animation
        const bgStyle = useAnimatedStyle(() => {
            const opacity = interpolate(translateY.value,[0, -0.4*height], [0, 1])
            return {
                opacity: opacity
            }
        })

        // position Update
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value}]
            }
        })

        // start Animation
        useEffect(()=>{
            translateY.value = withTiming(-0.4*height, {duration: 400,
                easing: Easing.bezier(0.49, 1.19, 0.79, 1.02),})
        }, [])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bgContainer, bgStyle]}>
        
        {/* Modal Container ---------------------------------------------------- */}
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={styles.line}></View>
            <View style={styles.midSectionContainer}>

            </View>
            <View style={styles.bottomSectionContainer}>
                <NavBackButton onPressBack={closeButton}/>
            </View>
        </Animated.View>

        {/* Close Button ------------------------------------------------------- */}
        <Pressable style={{flex: 1}} onPress={closeButton}/>

    </Animated.View>
    </GestureDetector>
  )
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    
    line:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },

    modalContainer: {
        height: 0.5*height,
        width: width,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        position: 'absolute',
        bottom: -0.5*height,
        zIndex: 1,
        justifyContent: 'space-between',
    
    },

    bgContainer: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1,
        position: 'absolute'
    },

    bottomSectionContainer: {
        height: (0.4*height)/2,
        width: width,
        // backgroundColor: 'yellow',
        alignItems: 'center',
    },

    midSectionContainer: {
        height: (0.4*height)/1.5,
        width: width,
        //backgroundColor: COLORS.subPrimary02
    },
})