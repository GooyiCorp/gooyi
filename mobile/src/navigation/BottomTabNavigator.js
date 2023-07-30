import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity} from 'react-native';

import { DiscoverScreen, CouponsScreen, FinderScreen, StoresScreen } from '../screens/index.js';
import { COLORS, ROUTES } from '../constants/index.js';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header.js';
import { Avatar, Button} from 'react-native-paper';
import StackNavigationStore from './StackNavigationStore.js';
import SearchBox from '../components/atoms/SearchBox.js'
import { NavButton } from '../components/atoms/Button.js';
import { ScrollView } from 'react-native-gesture-handler';
import { TopNavButton } from '../components/atoms/TopNavButton.js';


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
        // headerLeft: () => (
        //   <View style={styles.headerLeft}>
        //   </View>
        // )
      }}
    >
        <Tab.Screen 
            name={ROUTES.DISCOVER} 
            component={DiscoverScreen} 
            options={{
                tabBarLabel: 'Entdecken',
                headerTitle: () => <Header name='Entdecken'/>,
                tabBarIcon: ({ color }) => (<Entypo name="box" color={color} size={26} />),
                headerLeft: () => (
                  <View style={styles.headerLeft}>
                    <SearchBox/>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                      <TopNavButton lists={[
                      {id: 1, title: 'Alle'},
                      {id: 2, title: 'Favoriten'},]} />
                    {/* <NavButton title="Los geht's" onPress={console.log('Pressed')} style={{alignSelf: 'center'}} />
                    <NavButton title="Los geht's" onPress={console.log('Pressed')} style={{alignSelf: 'center'}} /> */}
                    </ScrollView>
                    </View>
                )
                
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
    shadowOpacity: 0,
    height: 169,
  },

  headerLeft: {
    width: 350,
    overflow:'hidden',
    flexDirection: 'row',
    position: 'absolute',
    top: 70,
    borderBottomWidth: 0,
    //backgroundColor: 'red',
    marginLeft: 28
  },

  qrButton: {
    height: 42,
    width: 42,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
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

  buttonStyle: {
    //height: 30,
    margin:5 
  }

})