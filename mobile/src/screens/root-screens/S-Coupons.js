import React, { useState } from 'react'
import { StyleSheet,View, Text , ScrollView} from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import PresentationHeader from '../../components/molecules/PresentationHeader'
import SortByShop from '../../components/molecules/SortByShop'
import { useNavigation } from '@react-navigation/native'





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen() {

  const navigation = useNavigation()

  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Coupons'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
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
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      
      <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader
          title={'Sortieren nach'}
          //showAllButton  
        />


          <SortByShop lists={[
                {id: 1, number: '1'},
                {id: 2, number: '5'},
                {id: 3, number: '3'},
                {id: 4, number: '3'}
            ]}/>


      </View>


      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({})