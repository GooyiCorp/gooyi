import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { View } from 'react-native';
import Animated, { interpolate, useSharedValue, withTiming, useAnimatedStyle, useAnimatedRef, withSpring, Easing, runOnUI, withDelay, withSequence } from 'react-native-reanimated';

import { useIsFocused } from '@react-navigation/native';
import { width, height } from '../../constants/size'

import CouponsScreen from '../../screens/root-screens/S-Coupons';





//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav() {

    // Value --------------------------------------------------------------- Transition

    const isFocused = useIsFocused()
    const transitionValue = useSharedValue(0)
    
    const screenHeight = height
    const screenWidth = width

    // WithTiming ---------------------------------------------------------- Transition
    
    transitionValue.value = isFocused? withSequence(withTiming(0, {duration: 0}), withTiming(1,{duration: 500, easing: Easing.bezier(0, 0.61, 0.49, 1)}) ) : transitionValue.value = 1
    //withTiming(1,{duration: 500, easing: Easing.bezier(0, 0.61, 0.49, 1)}, (finished) => {if (finished) {isFocused? transitionValue.value = 1 : transitionValue.value = withDelay(500, withTiming(0)) }})
    
    //transitionValue.value = withTiming(1,{duration: 500, easing: Easing.bezier(0, 0.61, 0.49, 1)}, (finished) => {if (finished) {isFocused? transitionValue.value = 1 : transitionValue.value = withDelay(500, withTiming(0)) }})

    // UseAnimatedStyle ---------------------------------------------------- Transition

    const transformScreen = useAnimatedStyle(() =>{
        const scaleScreen = interpolate(transitionValue.value, [0,1], [1, 0])
        const opacityScreen = interpolate(transitionValue.value, [0,1], [1,0])
            return {
                // transform:[
                //     {scale: scaleScreen}
                // ],
                // opacity: opacityScreen
        
            }
        }
    )

// ---------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Animated.View style={[ {height: screenHeight, width: screenWidth}]}>

        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        {/* Nesting Stack Navigator */}
        <CouponsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        
            {/* Nesting Stack Screens */}
            <CouponsStack.Screen 
                name='Coupons1'
                component={CouponsScreen}
            />
    
        </CouponsStack.Navigator>

        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        
            </Animated.View>
        </>
    )
}