import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ProfileScreen } from '../../index/screenIndex'

import { ROUTES } from '../../index/constantsindex'

//---------------------------------------------------------------------------------------------------------------------

const ProfileStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function ProfileStackNav({navigation}) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <ProfileStack.Screen 
            name={ROUTES.ProfileScreen1}
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
  )
}