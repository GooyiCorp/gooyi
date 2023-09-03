import React from 'react'
import { Button, ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import Animated from 'react-native-reanimated'
import CategorySelection from '../../components/molecules/CategorySelection'

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

      <CategorySelection/>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


    </View>
  )
}

const styles = StyleSheet.create({})