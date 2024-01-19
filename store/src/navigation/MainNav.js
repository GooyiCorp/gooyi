import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home/HomeScreen';
import RedeemScreen from '../screens/main/redeem/RedeemScreen';
import CouponsScreen from '../screens/main/coupons/CouponsScreen';
import MoreScreen from '../screens/main/more/MoreScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
const Main = createBottomTabNavigator();

export default function MainNav() {
  return (
    <Main.Navigator
        screenOptions={{
            // tabBarShowLabel: false
        }}
    >
        <Main.Screen 
            name='Home'
            component={HomeScreen}
        />
        <Main.Screen 
            name='Deals'
            component={HomeScreen}
        />
        <Main.Screen 
            name='Redeem'
            component={RedeemScreen}
            options={{
                tabBarIcon: () => {
                    return (
                        <MaterialIcons 
                            name="qr-code-scanner" 
                            size={26} 
                            color={COLORS.grey}
                            // style={{
                            //     padding: 10,
                            //     borderRadius: 16,
                            //     overflow: 'hidden',
                            //     backgroundColor: COLORS.primary,
                            //     bottom: 5,
                            //     position: 'absolute'
                            // }}
                            />
                    )
                },
                
            }}
        />
        <Main.Screen 
            name='Coupons'
            component={CouponsScreen}
      
        />
        <Main.Screen 
            name='More'
            component={MoreScreen}
        />
        
    </Main.Navigator>
  )
}

const styles = StyleSheet.create({})