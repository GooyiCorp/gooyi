import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';

import { DiscoverScreen, CouponsScreen, FinderScreen, StoresScreen } from '../screens/index.js';
import { COLORS, ROUTES } from '../constants/index.js';

import { Entypo } from '@expo/vector-icons';
import Header from './Header.js';
import { Avatar } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: styles.headerStyle,
        headerRight: () => (
          <View style={styles.row}>
            <TouchableOpacity>
              <Avatar.Text size={42} label="XD" />
            </TouchableOpacity>
            <View >
              <Button title='scan'/>
            </View>
          </View>
        ),
      }}
    >
        <Tab.Screen 
            name={ROUTES.DISCOVER} component={DiscoverScreen} 
            options={{
                tabBarLabel: 'Entdecken',
                headerTitle: () => <Header name='Entdecken'/>,
                tabBarIcon: ({ color }) => (<Entypo name="box" color={color} size={26} />),
                
                
            }}
        />
        <Tab.Screen name={ROUTES.COUPONS} component={CouponsScreen}/>
        <Tab.Screen name={ROUTES.FINDER} component={FinderScreen}/>
        <Tab.Screen name={ROUTES.STORES} component={StoresScreen}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    paddingHorizontal: 10, paddingVertical: 15,
    height: 90
  },

  headerStyle: {
    height: 169,
    backgroundColor: COLORS.transparent,
    borderBottomWidth: 0,
  },

  row: {
    flexDirection: 'row',
    marginRight: 15
  }
})