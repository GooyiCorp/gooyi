import React from 'react'
import { Button, View } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import { QRCodeScreen } from '../index/screenIndex'
import { DiscoverStackNav, CouponsStackNav, FinderStackNav, ProfileStackNav, StoresStackNav } from '../index/stackIndex'
import BottomTabNavigation from '../navigation/navigationComponents/BottomTabNavigation'

import { ROUTES } from '../index/constantsindex'


//---------------------------------------------------------------------------------------------------------------------

const RootStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function RootStackNavigator() {
    const navigation = useNavigation()
  return (
    <>
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
                animation: 'fade'
            }}
        />

    {/* Root Coupons ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootCoupons}
            component={CouponsStackNav}
            options={{
                animation: 'fade'
            }}
        />

    {/* Root Finder ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootFinder}
            component={FinderStackNav}
            options={{
                animation: 'fade'
            }}
        />

    {/* Root Stores ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootStores}
            component={StoresStackNav}
            options={{
                animation: 'fade'
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
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height:100, width: '100%' , backgroundColor: 'red'}}>
            <BottomTabNavigation navigation={navigation}/>
    {/* <Button title='move' onPress={() => {navigation.navigate(ROUTES.RootFinder)}}/> */}
    </View>
    
    </>
  )
}