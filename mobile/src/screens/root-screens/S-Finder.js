import React from 'react'
import { StyleSheet,View, Text, ScrollView } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FinderScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>

      {/* Main Header */}
      <MainHeader 
        title='Finder'
      />

      {/* Sub Header */}
      

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


      <ScrollView>

<View style={{width:200, height: 200, backgroundColor:'red'}}></View>
<View style={{width:200, height: 200, backgroundColor:'red'}}></View>
<View style={{width:200, height: 200, backgroundColor:'red'}}></View>
<View style={{width:200, height: 200, backgroundColor:'yellow'}}></View>
<View style={{width:200, height: 200, backgroundColor:'red'}}></View>
</ScrollView>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({})