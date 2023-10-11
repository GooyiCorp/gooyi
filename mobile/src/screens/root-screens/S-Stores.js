import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'
import StoreCard from '../../components/molecules/StoreCard'
import OfferBoxS from '../../components/molecules/OfferBoxS'

import axios from 'axios';
import { useNavigation } from '@react-navigation/native'


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function StoresScreen() {

  const navigation = useNavigation()
  const [fetchedData, setFetchedData] = useState([]);
    const getData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        

        console.log(res.data)
      } catch (error) {
    
        console.log(error)
      }
    }  
    
  return (
    <View style={{flex: 1}}>
      
      {/* Main Header */} 
      <MainHeader 
        title='Stores'
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
          {id: 1, title: 'Alle'},
          {id: 2, title: 'Meine Favoriten'},]}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
       <StoreCard />
       <OfferBoxS />
       <Text>{fetchedData}</Text>
       <Button title='next' onPress={getData}/>
       </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </View>
  )
}

const styles = StyleSheet.create({})