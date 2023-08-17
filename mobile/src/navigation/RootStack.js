import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { QRCodeScreen } from '../index/screenIndex'
import { DiscoverStackNav, CouponsStackNav, FinderStackNav, ProfileStackNav, StoresStackNav } from '../index/navIndex'

import { ROUTES } from '../index/constantsindex'


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
            name={ROUTES.RootDiscover}
            component={DiscoverStackNav}
            options={{
                animation: 'none'
            }}
        />

    {/* Root Coupons ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootCoupons}
            component={CouponsStackNav}
            options={{
                animation: 'none'
            }}
        />

    {/* Root Finder ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootFinder}
            component={FinderStackNav}
            options={{
                animation: 'none'
            }}
        />

    {/* Root Stores ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootStores}
            component={StoresStackNav}
            options={{
                animation: 'none'
            }}
        />

    {/* Root Profile ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootProfile}
            component={ProfileStackNav}
            options={{
                animation: 'none'
            }}
        />

    {/* Root QR ----------------------------------------------------------------------------- */}
        <RootStack.Screen
            name={ROUTES.RootQR}
            component={QRCodeScreen}
            options={{
                presentation: 'transparentModal',
                animation: 'fade',
            }}
        />  

    </RootStack.Navigator>
  )
}