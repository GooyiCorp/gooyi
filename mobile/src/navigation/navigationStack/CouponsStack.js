import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { CouponsScreen } from '../../index/screenIndex';

import { ROUTES } from '../../index/constantsindex';
import { View } from 'react-native';
import Animated, { interpolate, useSharedValue, withTiming, useAnimatedStyle, useAnimatedRef } from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav({route, navigation}) {
  const isFocused = useIsFocused()
  const scaleValue = useSharedValue(0)
  //const {testValue} = route.params;
  //console.log(testValue)


  scaleValue.value = withTiming(1,{duration: 3000}, (finished) => {
    if (finished) {
      console.log('ANIMATION ENDED');
      isFocused? scaleValue.value = 1 : scaleValue.value = 0
    } else {
      console.log('ANIMATION GOT CANCELLED');
    }
  })

  const style = useAnimatedStyle(() => {
          return {
            transform: [
              {scale: scaleValue.value}
            ],
          }
        }
  )
  console.log(scaleValue.value)

  return (
    <>
    <Animated.View style={[{height: 300, width: 300, overflow:'hidden'}, style]}>
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
    <Button title='scale' onPress={() => scaleValue = 1}/>
    </>
  )
}