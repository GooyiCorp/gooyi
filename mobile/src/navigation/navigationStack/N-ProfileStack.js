import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from '../../index/constantsindex'
import ProfileScreen from '../../screens/root-screens/S-Profile';

//---------------------------------------------------------------------------------------------------------------------

const ProfileStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function ProfileStackNav( {navigation} ) {
  return (
    <ProfileStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >

{/* Screen Profile 1 ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Profile1'
            component={ProfileScreen}
        />

    </ProfileStack.Navigator>
  )
}