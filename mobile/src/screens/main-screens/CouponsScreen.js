import React from 'react'
import { StyleSheet,View, Text } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({navigation}) {
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Coupons'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        avatar
        onPressAvatar={() => navigation.navigate(ROUTES.RootProfile)}
        qrButton
        onPressQRButton={() => navigation.navigate(ROUTES.RootQR)}
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




      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomTabNavigation navigation={navigation} focusIcon={'ticket-percent'}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})