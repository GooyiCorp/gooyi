import React, { useState } from 'react'
import { StyleSheet,View, Text , ScrollView, Button} from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import SortByShop from '../../components/molecules/SortByShop'
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import SearchModal from '../../components/components_universal/SearchModal'
import LogInRequired from './LogInRequired'
import { useSelector } from 'react-redux'





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({
  hideTabNav,
  showTabNav,
}) {

  const navigation = useNavigation()

  const logIn = !useSelector((state) => state.user.isLoggedIn)

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

      {logIn && <LogInRequired />}

      {showSearchModal && <SearchModal onClose={onCloseSearchModal}/>}

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
        onPressSearch={handleSearch}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Merkliste'},
          {id: 2, title: 'Meine Coupons'},]}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      
      {/* <View style={{width: '100%', paddingVertical: 15}}>

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


      </View> */}


      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({})