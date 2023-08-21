import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { StoresScreen, StorePlaceholder } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const StoresStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function StoresStackNav() {
  return (
    <StoresStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <StoresStack.Screen 
            name={ROUTES.StoreScreen1}
            component={StoresScreen}
        />
        <StoresStack.Screen 
            name={ROUTES.StoreScreen2}
            component={StorePlaceholder}
        />
    </StoresStack.Navigator>
  )
}
