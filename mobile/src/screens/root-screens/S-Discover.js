import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import Category from '../../components/atoms/Category'
import PresentationHeader from '../../components/molecules/PresentationHeader'
import NoResults from '../../components/molecules/NoResults'
import NewOfferBox from '../../components/molecules/NewOfferBox'

import axios from 'axios'
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {navigation} ) {
  const [category, setCategory] = useState([])
  const fetchCategory = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    setCategory(response.data)
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <View style={{flex: 1}}>

      {/* Main Header */} 
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        avatar
        onPressAvatar={() => navigation.navigate('Profile')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />

      {/* Sub Header */} 
      <SubHeader
        search
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      
      <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader 
          title={'Kategorie'}
          showAllButton={category.length > 5 ? true : false}
        />

        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 30, flexDirection: 'row'}}>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
        </ScrollView> */}
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

        {/* <NoResults message={'no results found :/'} boxHeight={{height: 253}}/> */}

      </View>

      <View style={{width: '100%', paddingVertical: 15}}>

      <PresentationHeader 
        title={'Neue Shops'}
        showAllButton  
      />

      <NoResults message={'no results found :/'} boxHeight={{height: 253}}/>

      </View>

      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


    </View>
  )
}

const styles = StyleSheet.create({})