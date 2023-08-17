import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CouponsScreen } from '../../index/screenIndex';

import { ROUTES } from '../../index/constantsindex';

//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav() {
  return (
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
  )
}