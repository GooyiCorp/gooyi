import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { COLORS, ROUTES } from '../../index/constantsindex'
import StoreCard from '../../components/components_stores_screen/StoreCard'
import OfferBoxS from '../../components/molecules/OfferBoxS'

import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import SearchModal from '../../components/components_universal/SearchModal'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import Category from '../../components/components_discover_screen/Category'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'


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

  const pageSelected = useSelector((state) => state.subNav.storeNavPage)
    
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
      
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
        onPressSearch={() => navigation.navigate('Search')}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Alle', payload: 'allStores'},
          {id: 2, title: 'Meine Favoriten', payload: 'favoriteStores'},
        ]}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* All Stores Page */}
      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {
      pageSelected == 'allStores' && 
      
      <ScrollView>

        {/* -------------------------------- Category Section */}
        <PresentationHeader
        title={'Kategorien'}
        // showAllButton
        />
        <View style={{marginLeft: 30}}>
          <Category
            title={'Sushi'}
            number={16}
          />
        </View>

        {/* -------------------------------- All Shops Section */}
        <PresentationHeader 
          title={'Alle Geschäfte'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          <StoreCard onPress={()=> navigation.navigate('Store')} newshop/>
        </View>

      </ScrollView>
      }

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* My Favorite Page */}
      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {
      pageSelected == 'favoriteStores' && 
      
      <ScrollView>

        {/* -------------------------------- Category Section */}
        <PresentationHeader
        title={'Meine Favoriten'}
        // showAllButton
        />

      </ScrollView>
      }

    </View>
  )
}

const styles = StyleSheet.create({})