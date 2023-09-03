import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../../screens/root-screens/S-Discover';

import Animated, { interpolate, useSharedValue, withTiming, useAnimatedStyle, useAnimatedRef, withSpring, Easing, runOnUI, withDelay } from 'react-native-reanimated';

import { useIsFocused } from '@react-navigation/native';
import { width, height } from '../../constants/size'






//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function DiscoverStackNav() {

       // Value --------------------------------------------------------------- Transition

       const isFocused = useIsFocused()
       const transitionValue = useSharedValue(0)
       
       const screenHeight = height
       const screenWidth = width
   
       // WithTiming ---------------------------------------------------------- Transition
       
       transitionValue.value = withTiming(1,{duration: 500, easing: Easing.bezier(0, 0.61, 0.49, 1)}, (finished) => {if (finished) {isFocused? transitionValue.value = 1 : transitionValue.value = withDelay(500, withTiming(0)) }})
   
       // UseAnimatedStyle ---------------------------------------------------- Transition
   
       const transformScreen = useAnimatedStyle(() =>{
           const scaleScreen = interpolate(transitionValue.value, [0,1], [1.1, 1])
           const opacityScreen = interpolate(transitionValue.value, [0,1], [0,1])
               return {
                   transform:[
                       {scale: scaleScreen}
                   ],
                   opacity: opacityScreen
           
               }
           }
       )
   
// ---------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Animated.View style={[ {height: screenHeight, width: screenWidth} , transformScreen]}>

        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        {/* Nesting Stack Navigator */}
        <DiscoverStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        
        {/* Nesting Stack Screens */}
          <DiscoverStack.Screen 
            name='Discover1'
            component={DiscoverScreen}
          />
    
        </DiscoverStack.Navigator>
        
        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            </Animated.View>
        
        </>
    )
}