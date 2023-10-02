import React, {useState, useEffect} from 'react'
import { StyleSheet,View, Text, ScrollView, Button, Dimensions } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import CategorySelectorCarousel from '../../components/molecules/CategorySelectorCarousel'


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FinderScreen({navigation}) {
  const width = Dimensions.get('window').width;
  const list = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Finder'
        categorySelector
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        headerContainerStyle={{backgroundColor: 'transparent'}}
      />

      {/* Sub Header */}
      

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
      </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({

})