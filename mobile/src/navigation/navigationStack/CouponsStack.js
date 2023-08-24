import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { CouponsScreen } from '../../index/screenIndex';

import { ROUTES } from '../../index/constantsindex';
import { View } from 'react-native';
import Animated, { interpolate, useSharedValue, withTiming, useAnimatedStyle, useAnimatedRef } from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import {width, height} from '../../constants/size'
//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav({route, navigation}) {
  const isFocused = useIsFocused()
  const transitionValue = useSharedValue(0)
  const screenHeight = height
  const screenWidth = width

  const diagonal = Math.sqrt(Math.pow(screenHeight,2) + Math.pow(screenWidth,2))
  console.log(diagonal)
  
  transitionValue.value = withTiming(1,{duration: 500}, (finished) => {if (finished) {isFocused? transitionValue.value = 1 : transitionValue.value = 0}})


  const transitionStyle = useAnimatedStyle(()=>{
    const translateY = interpolate(transitionValue.value, [0,1], [screenHeight, 0])
    const scale = interpolate(transitionValue.value, [0,1],[0,1])
      return {
        transform: [
          {translateY: translateY},
          {scale: scale},
        ],
        
      }
    }
  )

  const transformScreen = useAnimatedStyle(() =>{
    const scaleScreen = interpolate(transitionValue.value, [0,1], [2, 1])
    return {
        transform:[
          {scale: scaleScreen}
        ]
      }
    }
  )


  return (
    <>
    <View style={{height: screenHeight, width: screenWidth, overflow:'hidden', justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={[{width: diagonal, height: diagonal, borderRadius: diagonal/2, justifyContent: 'center', alignItems:'center', overflow: 'hidden'}, transitionStyle]}>
    <Animated.View style={[{ height: screenHeight, width: screenWidth, position:'relative'}, transformScreen]}>

    
      
    <CouponsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <CouponsStack.Screen 
            name={ROUTES.CouponsScreen1}
            component={CouponsScreen}
        />
    </CouponsStack.Navigator>
    </Animated.View>
    </Animated.View>
    </View>
    <Button title='scale' onPress={() => scaleValue = 1}/>
    </>
  )
}