import React, {useState, useEffect} from 'react'
import { StyleSheet,View, Text, ScrollView, Button, Dimensions } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import CategorySelectorCarousel from '../../components/molecules/CategorySelectorCarousel'
import Carousel from 'react-native-reanimated-carousel'
import CatergorySelectorIcons from '../../components/atoms/CategorySelectorIcons'


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
      />

      {/* Sub Header */}
      

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
      
        <CategorySelectorCarousel />
        <Carousel 
            style={{overflow: 'visibility'}}
          vertical
          loop
          width={width}
          height={50}
          // autoPlay={true}
          data={list}
          scrollAnimationDuration={1}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index }) => (
            <CatergorySelectorIcons number={index} onPressIn={() => console.log('press')}/>
          )}
      />
      </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({

})