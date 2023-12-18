import React from 'react'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import SettingOverview from '../../screens/profile_screens/settings_screens/SettingOverview';
import EditProfile from '../../screens/profile_screens/settings_screens/EditProfile';
import ChangePIN from '../../screens/profile_screens/settings_screens/ChangePIN';
import FaceID from '../../screens/profile_screens/settings_screens/FaceID';
import PaymentData from '../../screens/profile_screens/settings_screens/PaymentData';
import TermsCondition from '../../screens/profile_screens/settings_screens/TermsCondition';
import About from '../../screens/profile_screens/settings_screens/About';
import Support from '../../screens/profile_screens/settings_screens/Support';

import Notification from '../../screens/profile_screens/Notification';

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
{/* Screen Setting Main ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Setting'
            component={SettingOverview}
            // options={{
            //   presentation: 'transparentModal'
            // }}
        />

{/* Screen Profile Edit ------------------------------------------- */}
        <ProfileStack.Screen 
            name='EditProfile'
            component={EditProfile}
        />

{/* Screen Change PIN ------------------------------------------- */}
        <ProfileStack.Screen 
            name='ChangePin'
            component={ChangePIN}
        />

{/* Screen Face ID Setting ------------------------------------------- */}
        <ProfileStack.Screen 
            name='FaceID'
            component={FaceID}
        />

{/* Screen Payment Data ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Payment'
            component={PaymentData}
        />

{/* Screen Terms and Conditions ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Terms'
            component={TermsCondition}
        />

{/* Screen About ------------------------------------------- */}
        <ProfileStack.Screen 
            name='About'
            component={About}
        />

{/* Screen Help and Support ------------------------------------------- */}
        <ProfileStack.Screen 
            name='Support'
            component={Support}
        />  

{/* Screen Notification ------------------------------------------- */}
<ProfileStack.Screen 
            name='Notification'
            component={Notification}
            options={{
              presentation: 'transparentModal'
            }}
        />


        

    </ProfileStack.Navigator>
  )
}