import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'

import { COLORS, ROUTES } from '../../index/constantsindex'
import PresentationHeader from '../../components/molecules/PresentationHeader'
import NewOfferBox from '../../components/molecules/NewOfferBox'
import NewShopsBox from '../../components/molecules/NewShopsBox'
import CouponCard from '../../components/molecules/CouponCard'
import SortByShop from '../../components/molecules/SortByShop'
import BonusImageCard from '../../components/atoms/BonusImageCard'
import Accordion from '../../components/molecules/Accordion'
import AccordionContainer from '../../components/molecules/AccordionContainer'
import StoreCard from '../../components/molecules/StoreCard'
import { ScrollView } from 'react-native-gesture-handler'
import ProfileScreenButton from '../../components/molecules/ProfileScreenButton'
import {icons} from '../../components/components_universal/Icons'
import { useNavigation } from '@react-navigation/native'
import { height, width } from '../../constants/size'
import LogIn from './s_LogIn'
import UserCard from '../../components/components_profile_screen/UserCard'
import { Get } from '../../helper/store'
import { useSelector } from 'react-redux'
import ProfileInformation from '../../components/components_profile_screen/ProfileInformation'




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ProfileScreen() {
  
  const navigation = useNavigation()
  
  // Global State, userSlide - LogIn required? show/hide
  const logIn = !useSelector((state) => state.user.isLoggedIn)
  const token = useSelector((state) => state.user.accessToken)
  console.log(token)
  
  useEffect(() => {
    Get('accessToken')
  }, [])
  

  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.mainBackground}}>
       
      {logIn && <LogIn/>}
      {/* Main Header */}
      <MainHeader 
        title='Thanh Nguyen'
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        notificationButton
        onPressNotificationButton={() => navigation.navigate('Profile', {screen: 'Notification'})}
        headerContainerStyle={{backgroundColor: 'transparent'}}
      />

      {/* Sub Header */}
      {/* <SubHeader
        //userID
        idNumber={'400 121 9613'}
        subHeaderContainerStyle={{backgroundColor: 'transparent'}}
        //onPressSetting={() => navigation.navigate('Profile', {screen: 'Setting'})}
      />  */}

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1, backgroundColor: COLORS.mainBackground, alignItems: 'center'}}>
      
      <ProfileInformation/>
      {/* <View style={{width: '100%', paddingVertical: 15}}>

        <PresentationHeader 
          title={'Meine Stores'}
          showAllButton  
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20, overflow: 'visible'}}>
        <BonusImageCard />

        <BonusImageCard />
        <BonusImageCard />

        </ScrollView>

      </View > 

      <View style={{width: '100%',flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, marginVertical: 20}}>

        <ProfileScreenButton type={icons.Ionicons} ico={'mail-outline'} size={30} title={'Mein Postfach'}/>
        <ProfileScreenButton type={icons.Octicons} ico={'history'} size={24} title={'Punkteübersicht'}/>
        <ProfileScreenButton type={icons.SimpleLineIcons} ico={'bag'} size={30} title={'Meine Käufe'}/>
      
      </View>

      <View style={{width: '100%', paddingVertical: 15, alignItems: 'center'}}>

        <PresentationHeader 
          title={'Account verwalten'}
          //showAllButton  
        />
        <AccordionContainer />

      </View >  */}
      

      {/* <NewShopsBox /> */}

      {/* <CouponCard /> */}

      {/* <TouchableOpacity style={{marginTop: 30}}>
        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 15, color: '#B84058'}}>Abmelden</Text>
      </TouchableOpacity> */}

      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      {/* Bottom Navigation */}


    </View>
  )
}

const styles = StyleSheet.create({})