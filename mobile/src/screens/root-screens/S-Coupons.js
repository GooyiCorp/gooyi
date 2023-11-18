import React, { useState } from 'react'
import { StyleSheet,View, Text , ScrollView, Button} from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import SortByShop from '../../components/molecules/SortByShop'
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import SearchModal from '../../components/components_universal/SearchModal'
import LogInRequired from './LogInRequired'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store'

import PresentationHeader from '../../components/components_universal/PresentationHeader'
import { setCategory, setSelectedCategory } from '../../redux/slices/searchSlice'





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({
  hideTabNav,
  showTabNav,
}) {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const logIn = !useSelector((state) => state.user.isLoggedIn)

  const couponActivePage = useSelector((state) => state.subNav.couponNavPage)


  return (
    <View style={{height: height, width: width}}>

      {logIn && <LogInRequired />}

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
        onPressSearch={() => (navigation.navigate('Search'), dispatch(setCategory('Coupons')), dispatch(setSelectedCategory(2)) )}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Merkliste', payload: 'marks'},
          {id: 2, title: 'Meine Coupons', payload: 'myCoupons'},
        ]}
      /> 
  

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {couponActivePage == 'marks' && 
        <PresentationHeader 
          title={'Merkliste'}
          // showAllButton
        />
      }

      {couponActivePage == 'myCoupons' && 
        <PresentationHeader 
          title={'Meine Coupons'}
          // showAllButton
        />
      }


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({})