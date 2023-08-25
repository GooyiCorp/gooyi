import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ROUTES } from '../index/constantsindex'

import { QRCodeScreen } from '../index/screenIndex'
import { ProfileStackNav } from '../index/stackIndex'
import RootStackNavigator from './RootStack'

//---------------------------------------------------------------------------------------------------------------------

const MainStack = createStackNavigator()

// Screen Transition ---------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator
    screenOptions={{
        headerShown: false,    
    }}>

    {/* Root Stack Nav ----------------------------------------------------------------------------- */}
        <MainStack.Screen 
            name={ROUTES.RootNav} 
            component={RootStackNavigator} 
        />    
        
    {/* Tab Profile ----------------------------------------------------------------------------- */}
        <MainStack.Screen 
            name={ROUTES.MainProfile} 
            component={ProfileStackNav} 
        />

    {/* Root QR ----------------------------------------------------------------------------- */}
        <MainStack.Screen
            name={ROUTES.MainQR}
            component={QRCodeScreen}
            options={{
                presentation: 'transparentModal',
                animation: 'fade',
            }}
        /> 

    </MainStack.Navigator>
  )
}

const styles = StyleSheet.create({})