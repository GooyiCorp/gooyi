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
import Icons, { icons } from '../components/universal/Icons/Icons';
const Main = createBottomTabNavigator();

export default function MainNav() {
  return (
    <>
    {/* <MainHeader /> */}
    <Main.Navigator
        screenOptions={{
            headerShown: false,  
            tabBarActiveTintColor: COLORS.primary,
        }}
    >
        <Main.Screen 
            name='Home'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <Icons 
                    icon={icons.AntDesign}
                    iconName={'home'}
                    iconSize={28}
                    iconColor={color}
                  />
                ),
            }}
        />
        <Main.Screen 
            name='Scanner'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Scanner',
                tabBarIcon: ({ color }) => (
                  <Icons 
                    icon={icons.MaterialCommunityIcons}
                    iconName={'line-scan'}
                    iconSize={27}
                    iconColor={color}
                  />
                ),
            }}
        />
        <Main.Screen 
            name='Verlauf'
            component={CouponsScreen}
            options={{
                tabBarLabel: 'Verlauf',
                tabBarIcon: ({ color }) => (
                  <Icons 
                    icon={icons.AntDesign}
                    iconName={'swap'}
                    iconSize={28}
                    iconColor={color}
                  />
                ),
            }}
        />
        <Main.Screen 
            name='Verwalten'
            component={MoreScreen}
            options={{
                tabBarLabel: 'Verwalten',
                tabBarIcon: ({ color }) => (
                  <Icons 
                    icon={icons.AntDesign}
                    iconName={'appstore-o'}
                    iconSize={25}
                    iconColor={color}
                  />
                ),
            }}
        />
        
    </Main.Navigator>
    </>
  )
}

const styles = StyleSheet.create({})