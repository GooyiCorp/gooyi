import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home/HomeScreen';
import RedeemScreen from '../screens/main/redeem/RedeemScreen';
import CouponsScreen from '../screens/main/coupons/CouponsScreen';
import MoreScreen from '../screens/main/more/MoreScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../helper/constants/colors';
import MainHeader from '../components/components_Navigation/MainHeader';
const Main = createBottomTabNavigator();

export default function MainNav() {
  return (
    <>
    <MainHeader />
    <Main.Navigator
        screenOptions={{
            headerShown: false,    
        }}
    >
        <Main.Screen 
            name='Home'
            component={HomeScreen}
        />
        {/* <Main.Screen 
            name='Deals'
            component={}
        /> */}
        <Main.Screen 
            name='Coupons'
            component={CouponsScreen}
      
        />
        <Main.Screen 
            name='More'
            component={MoreScreen}
        />
        
    </Main.Navigator>
    </>
  )
}

const styles = StyleSheet.create({})