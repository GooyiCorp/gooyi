import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DiscoverScreen } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createNativeStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function DiscoverStackNav() {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <DiscoverStack.Screen 
            name={ROUTES.DiscoverScreen1}
            component={DiscoverScreen}
        />
    </DiscoverStack.Navigator>
  )
}