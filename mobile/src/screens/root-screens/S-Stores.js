import React from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'
import StoreCard from '../../components/molecules/StoreCard'
import OfferBoxS from '../../components/molecules/OfferBoxS'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function StoresScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      
      {/* Main Header */} 
      <MainHeader 
        title='Stores'
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
          {id: 1, title: 'Alle'},
          {id: 2, title: 'Meine Favoriten'},]}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
       <StoreCard />
       <OfferBoxS />
       
       <Button title='next' onPress={()=>{navigation.navigate(ROUTES.StoreScreen2)}}/>
       </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </View>
  )
}

const styles = StyleSheet.create({})