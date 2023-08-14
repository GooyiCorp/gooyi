import React from 'react'
import { StyleSheet,View, Text, TouchableOpacity, Button } from 'react-native'
import { Avatar } from 'react-native-paper';
import HeaderNavigation from '../../navigation/headercomponents/HeaderNavigation';
import TestScrollView from '../../components/atoms/TestScrollView';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



export default function DiscoverScreen({navigation, route}) {

  const hideTabBar = () => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Home"){
        navigation.setOptions({tabBarVisible: false})
  }};
  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'flex' },
    });
  };
  return (
   <View style={styles.screen}>
      <TestScrollView />
          <Button onPress={hideTabBar} title="Hide Tab Bar" color="#841584" />

<Button onPress={showTabBar} title="Show Tab Bar" color="#841584" />
    </View>
  )
}

const styles = StyleSheet.create({

    screen: {
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    }
})