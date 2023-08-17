import React from 'react'
import { StyleSheet,View, Text } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ProfileScreen({navigation, navigation: {goBack}}) {
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Moin Thanh'
        qrButton
        onPressQRButton={() => navigation.navigate(ROUTES.RootQR)}
        notificationButton
      />

      {/* Sub Header */}
      <SubHeader
        goBack
        onPressGoBack={() => goBack()}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}




      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */}


    </View>
  )
}

const styles = StyleSheet.create({})