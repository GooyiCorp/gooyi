import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet,View, Text } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import Category from '../../components/atoms/Category'
import PresentationHeader from '../../components/molecules/PresentationHeader'
import NoResults from '../../components/molecules/NoResults'
import NewOfferBox from '../../components/molecules/NewOfferBox'
import { icons } from '../../components/atoms/Icons'

import axios from 'axios'
import RoundButton from '../../components/components_universal/RoundButton'
import CouponsStackNav from '../../navigation/navigationStack/N-CouponsStack'
import { height, width } from '../../constants/size'
import { useNavigation } from '@react-navigation/native'
import LocateModal from '../../components/components_universal/LocateModal'
import SearchModal from '../../components/components_universal/SearchModal'
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen(  ) {
  const navigation = useNavigation()
  const [test, setTest] = useState(false)
  const [category, setCategory] = useState([])
  const fetchCategory = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    setCategory(response.data)
  }
  useEffect(() => {
    fetchCategory()
  }, [])

  // Locate Modal ----------------------------------------------------------------------
  const [showLocateModal, setShowLocateModal] = useState(false)
  const onCloseLocateModal = () => {
        setTimeout(() => {
          setShowLocateModal(false);
        }, 300) }
  const handleLocate = () => {
          setShowLocateModal(true)
      }

  // Search Modal ----------------------------------------------------------------------
  const [showSearchModal, setShowSearchModal] = useState(false)
  const onCloseSearchModal = () => {
        setTimeout(() => {
          setShowSearchModal(false);
        }, 300) }
  const handleSearch = () => {
          setShowSearchModal(true)
      }
  
  return (
    <View style={[{height: height, width: width}]}>
    {showSearchModal && <SearchModal onClose={onCloseSearchModal}/>}
    {showLocateModal && <LocateModal onClose={onCloseLocateModal}/>}
      {/* Main Header */} 
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        navigateButton
      />

      {/* Sub Header */} 
      <SubHeader
        search
        onPressSearch={handleSearch}
        locateButton
        onPressLocate={handleLocate}
        iconState={showSearchModal}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View >
      {/* <ScrollView>
      <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader 
          title={'Kategorie'}
          showAllButton={category.length > 5 ? true : false}
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 30, flexDirection: 'row'}}
          data={category.slice(0,5)}
          renderItem={({item}) =><Category title={item.username} number={Math.floor(item.address.geo.lat)}/> }
        />

      </View>

      <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader 
          title={'Neue Angebote'}
          //showAllButton  
        />
        <NewOfferBox />



      </View>

      <View style={{width: '100%', paddingVertical: 15}}>

      <PresentationHeader 
        title={'Neue Shops'}
        showAllButton  
      />

      <NoResults message={'no results found :/'} boxHeight={{height: 253}}/>

      </View>
     

      </ScrollView> */}

      </View>



      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      

    </View>
  )
}

const styles = StyleSheet.create({})