import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import QRCodeScreen from '../screens/main-screens/QRCodeScreen';
import CouponsStackNav from './navigationStack/CouponsStack';
import DiscoverStackNav from './navigationStack/DiscoverStack';
import FinderStackNav from './navigationStack/FinderStack';
import ProfileStackNav from './navigationStack/ProfileStack';
import StoresStackNav from './navigationStack/StoresStack';




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

    {/* Root Discover ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name='RootDiscover'
            component={DiscoverStackNav}
        />

    {/* Root Coupons ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name='RootCoupons'
            component={CouponsStackNav}
        />

    {/* Root Finder ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name='RootFinder'
            component={FinderStackNav}
        />

    {/* Root Stores ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name='RootStores'
            component={StoresStackNav}
        />

    {/* Root Profile ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name='RootProfile'
            component={ProfileStackNav}
        />

    {/* Root QR ----------------------------------------------------------------------------- */}
        <RootStack.Screen
            name='RootQR'
            component={QRCodeScreen}
            options={{
                presentation: 'transparentModal',
                animation: 'fade',
            }}
        />  

    </RootStack.Navigator>
  )
}


            // options={({route}) => ({
            //     headerTitle: GetHeaderTitle(route),
            //     headerShown
            // })}