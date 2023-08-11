import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainBottomTab from './navigatorfirstdegree/MainBottomTab'
import GetHeaderTitle from './navhelperfunction/HeaderTitle';
import ProfileStackNav from './navigatorfirstdegree/navigatorseconddegree/ProfileStack';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import QRCodeScreen from '../screens/main-screens/QRCodeScreen';



//---------------------------------------------------------------------------------------------------------------------

const RootStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <RootStack.Screen 
            name='Home'
            component={MainBottomTab}
            options={({route}) => ({
                headerTitle: GetHeaderTitle(route),
            })}
        />

        <RootStack.Screen
            name='QRCode'
            component={QRCodeScreen}
            options={{
                presentation: 'transparentModal',
                animation: 'fade',
                //animationTypeForReplace: 'pop'
            }}
        />  

    </RootStack.Navigator>
  )
}
