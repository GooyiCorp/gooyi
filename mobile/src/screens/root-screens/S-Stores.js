import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'
import StoreCard from '../../components/molecules/StoreCard'
import OfferBoxS from '../../components/molecules/OfferBoxS'

import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import SearchModal from '../../components/components_universal/SearchModal'


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function StoresScreen({
  showTabNav,
  hideTabNav,
}) {

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

  // Search Modal ----------------------------------------------------------------------
  const [showSearchModal, setShowSearchModal] = useState(false)
  const onCloseSearchModal = () => {
        showTabNav()
        setTimeout(() => {
          setShowSearchModal(false);
        }, 500) }
  const handleSearch = () => {
          setShowSearchModal(true)
          hideTabNav()
        }
    
  return (
    <View style={{height: height, width: width}}>

      {showSearchModal && <SearchModal onClose={onCloseSearchModal}/>}
      
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
        onPressSearch={handleSearch}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Alle'},
          {id: 2, title: 'Meine Favoriten'},]}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={()=> navigation.navigate('Store')} title='move'></Button>
       {/* <StoreCard />
       <OfferBoxS />
       <Text>{fetchedData}</Text>
       <Button title='next' onPress={getData}/> */}
       </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </View>
  )
}

const styles = StyleSheet.create({})