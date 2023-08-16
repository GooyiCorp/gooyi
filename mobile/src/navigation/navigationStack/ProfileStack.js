import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfilePlaceholder } from '../../screens/sub-screens/PlaceholderScreen';



//---------------------------------------------------------------------------------------------------------------------

const ProfileStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function ProfileStackNav({navigation}) {
  return (
    <ProfileStack.Navigator>
        <ProfileStack.Screen 
            name='ProfileScreen'
            component={ProfilePlaceholder}
        />
    </ProfileStack.Navigator>
  )
}

const styles = StyleSheet.create({})