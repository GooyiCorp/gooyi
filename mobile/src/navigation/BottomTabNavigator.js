import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';

import { DiscoverScreen, CouponsScreen, FinderScreen, StoresScreen } from '../screens/index.js';
import { COLORS, ROUTES } from '../constants/index.js';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header.js';
import { Avatar } from 'react-native-paper';
import StackNavigationStore from './StackNavigationStore.js';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: styles.headerStyle,
        headerTitleContainerStyle: styles.titleContainer,
        headerRightContainerStyle: styles.rightContainer,
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 25}}>
            <TouchableOpacity style={styles.qrButton}>
              <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Avatar.Text size={42} label="XD" style={{margin: 5}}/>
            </TouchableOpacity>
          </View>
        ),
        headerTitleAlign: 'left',
        headerLeft: () => (
          <View style={styles.headerLeft}>
          <Button title='test' />
          <Button title='test' />
          <Button title='test' />
          </View>
        )
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
        <Tab.Screen name='StackNavigation' component={StackNavigationStore}/>
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
  },

  headerLeft: {
    flexDirection: 'row',
    position: 'absolute',
    top: 80,
    borderBottomWidth: 0,
  },

  qrButton: {
    height: 42,
    width: 42,
    backgroundColor: COLORS.primary,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },

  titleContainer: {
    marginTop: 25, 
    marginLeft: 30,
    justifyContent: 'flex-start',
  },

  rightContainer: {
    marginTop: 15,
    justifyContent: 'flex-start',
  },

})