import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler';

import DiscoverStackNav from './navigatorseconddegree/DiscoverStack';
import FinderStackNav from './navigatorseconddegree/FinderStack';
import StoresStackNav from './navigatorseconddegree/StoresStack';
import CouponsStackNav from './navigatorseconddegree/CouponsStack';
import GetHeaderTitle from '../navhelperfunction/HeaderTitle';
import ProfileStackNav from './navigatorseconddegree/ProfileStack';
import Header from '../navhelperfunction/Header';
import SearchBox from '../../components/atoms/SearchBox';
import { TopNavButton } from '../../components/atoms/TopNavButton';

import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//---------------------------------------------------------------------------------------------------------------------

const MainTab = createBottomTabNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function MainBottomTab() {
  return (
    <MainTab.Navigator
    screenOptions={({navigation}) => ({
      
      // Styles
      tabBarStyle: styles.tabBar,
      headerStyle: styles.headerStyle,
      
      // Header Title
      headerTitleContainerStyle: styles.titleContainer,
      headerTitleAlign: 'left',
      
      // Header Right 
      headerRightContainerStyle: styles.rightContainer,
      headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 25}}>
              <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('QRCode')}>
                  <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Avatar.Text size={42} label="XD" style={{margin: 5}}/>
              </TouchableOpacity>
          </View>
      
      ),
  })}
    >

    {/* ------------ Discover ------------ */}
      
      <MainTab.Screen 
        name='Discover'
        component={DiscoverStackNav}
        options={{
          tabBarLabel: 'Entdecken',

          headerTitle: () => <Header name='Entdecken'/>,

        }}
      />

    {/* ------------ Coupons ------------ */}
      
      <MainTab.Screen 
        name='Coupons'
        component={CouponsStackNav}
        options={{
          headerTitle: () => <Header name='Coupons'/>,
        }} 
      />

    {/* ------------ Finder ------------ */}
      
      <MainTab.Screen 
        name='Finder'
        component={FinderStackNav}
        options={{
          headerTitle: () => <Header name='Finder'/>,
        }} 
      />

    {/* ------------ Stores ------------ */}
      
      <MainTab.Screen 
        name='Stores'
        component={StoresStackNav}
        options={({route}) => ({
          headerTitle: () => <Header name={GetHeaderTitle(route)}/>,
        })}
      />

    {/* ------------ Profil ------------ */}

      <MainTab.Screen 
        name='Profile'
        component={ProfileStackNav}
        options={{
          tabBarButton: () => null,
          headerRight: () => (
            <Text>test</Text>
          )
        }}
      />

    </MainTab.Navigator>
  )
}

//---------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create ({

  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    paddingHorizontal: 10, paddingVertical: 15,
    height: 90
  },
  
  headerStyle: {
    shadowOpacity: 0,
    height: 110,
  },

  titleContainer: {
    marginTop: 25, 
    marginLeft: 30,
    justifyContent: 'flex-start',
    //backgroundColor: 'red'
  },

  rightContainer: {
    marginTop: 15,
    justifyContent: 'flex-start',
  },

  headerLeft: {
    width: 350,
    overflow:'hidden',
    flexDirection: 'row',
    position: 'absolute',
    top: 70,
    borderBottomWidth: 0,
    marginLeft: 28
  },
  
  qrButton: {
    height: 42,
    width: 42,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },

})