import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DiscoverScreen from './main-screens/DiscoverScreen.js';
import CouponsScreen from './main-screens/CouponsScreen.js';
import StoresScreen from './main-screens/StoresScreen.js';
import FinderScreen from './main-screens/FinderScreen.js';
import { Entypo } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator 
        activeColor="black"
        inactiveColor="grey"
        barStyle={{ backgroundColor: 'white', borderTopWidth: 0

    }}
    color={false}

      >
        <Tab.Screen 
            name='discover' 
            component={DiscoverScreen} 
            options={{
                tabBarLabel: 'Entdecken',
                tabBarIcon: ({ color }) => (
                <Entypo name="box" color={color} size={26} />
                
                ),
            
            }}
        />
        <Tab.Screen name='coupons' component={CouponsScreen}/>
        <Tab.Screen name='finder' component={FinderScreen}/>
        <Tab.Screen name='stores' component={StoresScreen}/>
    </Tab.Navigator>
  )
}

export default Navigation
