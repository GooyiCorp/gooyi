import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { DiscoverScreen } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createStackNavigator()

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