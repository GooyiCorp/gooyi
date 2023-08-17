import React from 'react'
import { StyleSheet,View, Text } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FinderScreen({navigation}) {
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Finder'
      />

      {/* Sub Header */}
      

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}




      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomTabNavigation navigation={navigation} focusIcon={'map-marker'}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})