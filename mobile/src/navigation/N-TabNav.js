import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DiscoverStackNav from './navigationStack/N-DiscoverStack';
import CouponsStackNav from './navigationStack/N-CouponsStack';
import FinderStackNav from './navigationStack/N-FinderStack';
import StoresStackNav from './navigationStack/N-StoresStack';





//---------------------------------------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function TabNav() {

  return (
    <>
    <Tab.Navigator
        initialRouteName='Finder'
        screenOptions={{
            headerShown: false,    
            
        }}
    >

{/* Screen Discover ------------------------------------------------------ */}
        <Tab.Screen 
            name='Discover' 
            component={DiscoverStackNav}

        />

{/* Screen Coupons ------------------------------------------------------- */}
        <Tab.Screen 
            name='Coupons' 
            component={CouponsStackNav}
        />

{/* Screen Finder -------------------------------------------------------- */}
        <Tab.Screen 
            name='Finder' 
            component={FinderStackNav}
        />

{/* Screen Stores -------------------------------------------------------- */}
        <Tab.Screen 
            name='Stores' 
            component={StoresStackNav}
        />

    </Tab.Navigator>

    </>
  )
}

const styles = StyleSheet.create({})