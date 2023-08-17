import React from 'react'
import { StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen({navigation}) {

  return (
    <View style={{flex: 1}}>
      
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




      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */} 
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomTabNavigation navigation={navigation} focusIcon={'rocket-sharp'}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})