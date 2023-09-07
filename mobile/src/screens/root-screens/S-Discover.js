import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet,View } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import Category from '../../components/atoms/Category'
import PresentationHeader from '../../components/molecules/PresentationHeader'
import NoResults from '../../components/molecules/NoResults'
import NewOfferBox from '../../components/molecules/NewOfferBox'


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {navigation} ) {

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
          //showAllButton  
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 30, flexDirection: 'row'}}>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
          <Category title={'Sushi'} number={12}/>
        </ScrollView>

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