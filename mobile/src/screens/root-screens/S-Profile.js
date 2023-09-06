import React from 'react'
import { StyleSheet,View, Text } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { ROUTES } from '../../index/constantsindex'
import PresentationHeader from '../../components/molecules/PresentationHeader'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ProfileScreen({navigation, navigation: {goBack}}) {
  return (
    <View style={{flex: 1}}>

      {/* Main Header */}
      <MainHeader 
        title='Moin Thanh'
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        notificationButton
      />

      {/* Sub Header */}
      <SubHeader
        goBack
        onPressGoBack={() => goBack()}
        userID
        idNumber={'400 121 9613'}
      /> 

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      
      <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader 
          title={'Meine Stores'}
          showAllButton  
        />

      </View>

      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */}


    </View>
  )
}

const styles = StyleSheet.create({})