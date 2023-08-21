import React from 'react'
import { ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen({navigation}) {

  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      
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

        <View style={{width:200, height: 200, backgroundColor:'red'}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red'}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red'}}></View>
        <View style={{width:200, height: 200, backgroundColor:'blue'}}></View>
        <View style={{width:200, height: 200, backgroundColor:'red'}}></View>
      </ScrollView>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </View>
  )
}

const styles = StyleSheet.create({})