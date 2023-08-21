import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { FinderScreen } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const FinderStack = createStackNavigator();

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
