import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DiscoverStackNav from './navigationStack/N-DiscoverStack';
import CouponsStackNav from './navigationStack/N-CouponsStack';
import StoresStackNav from './navigationStack/N-StoresStack';
import ProfileStackNav from './navigationStack/N-ProfileStack';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { COLORS } from '../index/constantsindex';





//---------------------------------------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function TabNav() {

  return (
    <>
    <Tab.Navigator
        initialRouteName='Discover'
        screenOptions={{
            headerShown: false,    
            
        }}
    >

{/* Screen Discover ------------------------------------------------------ */}
        <Tab.Screen 
            name='Discover' 
            component={DiscoverStackNav}
            options={{
                tabBarIcon: () => (<Octicons name="rocket" size={22} color={COLORS.subPrimary} />)
            }}

        />

{/* Screen Coupons ------------------------------------------------------- */}
        <Tab.Screen 
            name='Coupons' 
            component={CouponsStackNav}
            options={{
                tabBarIcon: () => (<Feather name="percent" size={26} color={COLORS.subPrimary} />)
            }}
        />

{/* Screen Stores -------------------------------------------------------- */}
        <Tab.Screen 
            name='Stores' 
            component={StoresStackNav}
            options={{
                tabBarIcon: () => (<MaterialCommunityIcons name="storefront-outline" size={26} color={COLORS.subPrimary} />)
            }}
        />

{/* Profile Finder -------------------------------------------------------- */}
        <Tab.Screen 
            name='Profile' 
            component={ProfileStackNav}
            options={{
                tabBarIcon: () => (<Feather name="user" size={26} color={COLORS.subPrimary} />)
            }}
        />

    </Tab.Navigator>

    </>
  )
}

const styles = StyleSheet.create({})