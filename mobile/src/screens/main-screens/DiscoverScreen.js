import React from 'react'
import { ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'
import Animated from 'react-native-reanimated'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen({navigation}) {

  return (
    <View style={{flex: 1, backgroundColor: 'green', overflow: 'hidden'}}>

      {/* Main Header */} 
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        avatar
        onPressAvatar={() => navigation.navigate(ROUTES.RootProfile)}
        qrButton
        onPressQRButton={() => navigation.navigate(ROUTES.RootQR)}
      />

      {/* Sub Header */} 
      <SubHeader
        search
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <ScrollView>

        <Animated.View style={{width:200, height: 200, backgroundColor:'red', marginVertical: 10, borderRadius: 10}}></Animated.View>
        <View style={{width:200, height: 200, backgroundColor:'red', marginVertical: 10}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red', marginVertical: 10}}></View>
        <View style={{width:200, height: 200, backgroundColor:'blue', marginVertical: 10}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red', marginVertical: 10}}></View>
      </ScrollView>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </View>
  )
}

const styles = StyleSheet.create({})