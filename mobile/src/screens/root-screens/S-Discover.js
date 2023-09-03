import React from 'react'
import { Button, ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import Animated from 'react-native-reanimated'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {navigation} ) {

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(204, 204, 204)'}}>

      {/* Main Header */} 
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        avatar
        onPressAvatar={() => navigation.navigate('Profile')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />

      {/* Sub Header */} 
      <SubHeader
        search
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <ScrollView>
        <Animated.View style={{width:200, height: 200, backgroundColor:'grey', marginVertical: 10, borderRadius: 10}}></Animated.View>
        <View style={{width:200, height: 200, backgroundColor:'grey', marginVertical: 10, transform:[{scale: 0.5}], }}>
        <View style={{width:300,height: 300, backgroundColor:'yellow', marginVertical: 10, }}></View>
        </View>
        <View style={{width:200, height: 200, backgroundColor:'grey', marginVertical: 10}}></View>
        <View style={{width:200, height: 200, backgroundColor:'blue', marginVertical: 10}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red', marginVertical: 10}}></View>
      </ScrollView>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


    </View>
  )
}

const styles = StyleSheet.create({})