import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FinderScreen } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const FinderStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function FinderStackNav() {
  return (
    <FinderStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <FinderStack.Screen 
            name={ROUTES.FinderScreen1}
            component={FinderScreen}
        />
    </FinderStack.Navigator>
  )
}
