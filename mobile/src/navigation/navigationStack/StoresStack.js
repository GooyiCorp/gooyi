import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { StoresScreen, StorePlaceholder } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

import { View } from 'react-native';
import Animated, { interpolate, useSharedValue, withTiming, useAnimatedStyle, useAnimatedRef, withSpring, Easing, withDelay } from 'react-native-reanimated';

import { useIsFocused } from '@react-navigation/native';
import { width, height } from '../../constants/size'

//---------------------------------------------------------------------------------------------------------------------

const StoresStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function StoresStackNav() {
        // Value --------------------------------------------------------------- Transition

        const isFocused = useIsFocused()
        const transitionValue = useSharedValue(0)
        
        const screenHeight = height
        const screenWidth = width
        
        const justifyValueX = (screenWidth/4)*3.5
        const diagonal = Math.sqrt(Math.pow(screenHeight,2) + Math.pow(screenWidth,2))
      
        // WithTiming ---------------------------------------------------------- Transition
        
        transitionValue.value = withTiming(1,{duration: 500, easing: Easing.bezier(0, 0.61, 0.49, 1)}, (finished) => {if (finished) {isFocused? transitionValue.value = 1 : transitionValue.value = withDelay(500, withTiming(0)) }})
      
        // UseAnimatedStyle ---------------------------------------------------- Transition
      
        const transitionStyle = useAnimatedStyle(()=>{
          const translateY = interpolate(transitionValue.value, [0,1], [screenHeight, 0])
          const size = interpolate(transitionValue.value, [0.5,1],[0,diagonal])
          const translateX = interpolate(transitionValue.value, [0,1], [justifyValueX, 0])
            return {
              width: size,
              height: size,
              transform: [
                {translateY: translateY},
              ],
              left: translateX,
            }
          }
        )
      
        // ..............................
      
        const transformScreen = useAnimatedStyle(() =>{
          const scaleScreen = interpolate(transitionValue.value, [0,1], [2, 1])
          return {
              transform:[
                {scale: scaleScreen}
              ]
            }
          }
        )
      
      //---------------------------------------------------------------------------------------------------------------------

  return (
    <>

    <View style={{height: screenHeight, width: screenWidth, overflow:'hidden', justifyContent: 'center', alignItems: 'center'}}>
      
      <Animated.View style={[{width: diagonal, height: diagonal, borderRadius: diagonal/2, justifyContent: 'center', alignItems:'center', overflow: 'hidden'}, transitionStyle]}>
        <Animated.View style={[{ height: screenHeight, width: screenWidth, position: 'absolute'}, transformScreen]}>

    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
    
    {/* Nesting Stack Navigator */}
    <StoresStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
    
    {/* Nesting Stack Screens */}
        <StoresStack.Screen 
            name={ROUTES.StoreScreen1}
            component={StoresScreen}
        />
    
        <StoresStack.Screen 
            name={ROUTES.StoreScreen2}
            component={StorePlaceholder}
        />
    </StoresStack.Navigator>

    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        </Animated.View>
        </Animated.View>
  
      </View>
  
    </>
  )
}
