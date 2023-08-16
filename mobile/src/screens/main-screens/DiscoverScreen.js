import React from 'react'
import { StyleSheet,View, Text, TouchableOpacity, Button } from 'react-native'
import { Avatar } from 'react-native-paper';
import HeaderNavigation from '../../navigation/headercomponents/HeaderNavigation';
import TestScrollView from '../../components/atoms/TestScrollView';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { useSharedValue , useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import MainHeader from '../../navigation/navigationComponents/MainHeader';
import BottomTabNavigation from '../../navigation/navigationComponents/BottomTabNavigation';



export default function DiscoverScreen({navigation}) {

  return (
    <View style={{flex: 1}}>
      <MainHeader 
        title='test'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        //avatar
        //onPressAvatar={() => navigation.navigate('RootProfile')}
        qrButton
        onPressQRButton={() => navigation.navigate('RootQR')}
        notificationButton
      />  
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomTabNavigation navigation={navigation}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    screen: {
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    },

    
})