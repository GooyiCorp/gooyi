import React, {useState, useEffect} from 'react'
import { StyleSheet,View, Text, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import CategorySelectorCarousel from '../../components/molecules/CategorySelectorCarousel'
import FinderShopCard from '../../components/molecules/FinderShopCard';


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FinderScreen({navigation}) {
  const width = Dimensions.get('window').width;
  const list = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Finder'
        categorySelector
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        headerContainerStyle={{backgroundColor: 'transparent'}}
      />

      {/* Sub Header */}
      <SubHeader 
        navigateButton
        subHeaderContainerStyle={{backgroundColor: 'transparent'}}
        goBack
      />

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', paddingHorizontal: 30}}>
          <Text style={{fontFamily: 'Roboto-Medium', fontSize: 22}}>24<Text style={{fontFamily: 'Roboto-Light', fontSize: 17}}> Shops</Text></Text>
          <TouchableOpacity><Text style={{fontFamily: 'Roboto-Medium', fontSize: 11, color: '#B84058'}}>Alle Anzeigen</Text></TouchableOpacity>
        </View>
        <View>
          <FinderShopCard />
        </View>
      </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({

})