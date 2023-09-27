import React, {useState, useEffect} from 'react'
import { StyleSheet,View, Text, ScrollView, Button } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import CategorySelectorCarousel from '../../components/molecules/CategorySelectorCarousel'




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

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
      
        <CategorySelectorCarousel />

      </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({

})