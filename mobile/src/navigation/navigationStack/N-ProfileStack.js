import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from '../../index/constantsindex'
import ProfileScreen from '../../screens/root-screens/S-Profile';
import EditProfile from '../../screens/sub-screens/SP-EditProfile';
import AccountSetting from '../../screens/sub-screens/SP-AccountSetting';
import Notification from '../../screens/sub-screens/SP-Notification';

//---------------------------------------------------------------------------------------------------------------------

const ProfileStack = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function ProfileStackNav( {navigation} ) {
  return (
    <ProfileStack.Navigator
        initialRouteName='Profile1'
        screenOptions={{
            headerShown: false
        }}
    >

{/* Screen Profile 1 ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Profile1'
            component={ProfileScreen}
        />

{/* Screen Edit Profile ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Profile2'
            component={EditProfile}
            options={{
              presentation: 'transparentModal'
            }}
        />

{/* Screen Setting ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Profile3'
            component={AccountSetting}
            options={{
              presentation: 'transparentModal'
            }}
        />

{/* Screen Notification ------------------------------------------- */}
<ProfileStack.Screen 
            name='Profile4'
            component={Notification}
            options={{
              presentation: 'transparentModal'
            }}
        />

    </ProfileStack.Navigator>
  )
}