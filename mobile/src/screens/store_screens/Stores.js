import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, Button, FlatList } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { COLORS, ROUTES } from '../../index/constantsindex'
import StoreCard from '../../components/components_stores_screen/StoreCard'

import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import Category from '../../components/components_discover_screen/Category'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSelectedCategory, setResetFilter } from '../../redux/slices/searchSlice'
import Request from './../../helper/request.js';
import { store } from '../../redux/store.js'
import * as Location from 'expo-location';


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function StoresScreen({
  showTabNav,
  hideTabNav,
}) {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  // Categories fetching
  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    const response = await Request(`user/categories?longitude=${longitude}&latitude=${latitude}&radius=${10000}`)
    if (response.success) {
      setCategories(response.data)
    }
  }
  useEffect(() => {
    getCategories()
  }, [longitude, latitude])



  const [stores, setStores] = useState([]);
  const [radius, setRadius] = useState(1000);
  // Duc Anh: chinh radius o day
  const longitude = useSelector((state) => state.locate.long)
  const latitude = useSelector((state) => state.locate.lat)
  const getStores = async () => {
    try {
      // Duc anh: Neu chua dang nhap thi goi cai nay
      const response = await Request(`user/store?longitude=${longitude}&latitude=${latitude}&radius=${radius}`, "GET")
      // Neu dang nhap roi thi goi cai nay
      // const accessToken = store.getState().user.accessToken
      // const response = await Request(`user/store/find?longitude=${longitude}&latitude=${latitude}&radius=${radius}`, "GET",data={},token=accessToken)
      setStores(response.data)
    } catch (error) {  
      console.log(error.response.data)
    }
  }  
  useEffect(() => {
    getStores();
  }, [radius, longitude, latitude])

  const pageSelected = useSelector((state) => state.subNav.storeNavPage)
    
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
      
      {/* Main Header */} 
      <MainHeader 
        title='Geschäfte'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />

      {/* Sub Header */} 
      <SubHeader 
        search
        onPressSearch={() => (
          navigation.navigate('Search'),
          dispatch(setCategory('Geschäfte')),
          dispatch(setResetFilter())
        )}
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
          <FlatList
            data={categories}
            renderItem={({ item }) => <Category title={item.name} number={item.count} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* -------------------------------- All Shops Section */}
        <PresentationHeader 
          title={'Alle Geschäfte'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          {
            stores && stores.map((store, index) => {
              return (
                <StoreCard key={index} onPress={() => navigation.navigate('Store', {store_id: "ok"})} newshop shopName={store.name} description={store.description} distance={store.distance}/>
              )
            })
          }
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