import React, { useState } from 'react'
import { StyleSheet,View, Text , ScrollView} from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({ navigation}) {


  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Coupons'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        avatar
        onPressAvatar={() => navigation.navigate('Profile')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />

      {/* Sub Header */}
      <SubHeader
        search
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Merkliste'},
          {id: 2, title: 'Meine Coupons'},]}
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