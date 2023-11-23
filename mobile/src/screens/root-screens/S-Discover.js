import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet,View, Text, Pressable } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'

import { height, width } from '../../constants/size'
import { useNavigation } from '@react-navigation/native'
import LocateModal from '../../components/components_locate_screen/LocateModal'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store'
import userSlice, { setLoggedOut, setLoggedIn, setToken, setRefreshToken } from '../../redux/slices/userSlice'
import { Delete } from '../../helper/store'
import Request from '../../helper/request'
import NewOfferBox from '../../components/components_discover_screen/NewOfferBox'
import NewShopsBox from '../../components/components_discover_screen/NewShopsBox'
import Category from '../../components/components_discover_screen/Category'
import Animated, { interpolate, interpolateColor, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import CouponCard from '../../components/components_universal/CouponCard'
import LogInRequiredBox from '../../components/components_discover_screen/LogInRequiredBox'
import { setPage } from '../../redux/slices/mainNavSlice'
import { setHideLocateModal, setShowLocateModal } from '../../redux/slices/showModalSlice'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'
import { setCategory, setResetFilter, setSelectedCategory } from '../../redux/slices/searchSlice'

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {
  hideTabNav,
  showTabNav,
} ) {
  const navigation = useNavigation()

  const logIn = !useSelector((state) => state.user.isLoggedIn)

  const dispatch = useDispatch()

  const scrollRef = useRef()

  // Locate Modal ----------------------------------------------------------------------
  const showLocateModal = useSelector((state) => state.showModal.locateModal)

  const handleLocate = () => {
    showLocateModal? dispatch(setHideLocateModal()) : dispatch(setShowLocateModal())
  }

  useEffect(() => {
    showLocateModal? hideTabNav() : showTabNav()
  }, [showLocateModal])
  

  const handleTestPress = () => {
    dispatch(setLoggedIn())
    //console.log(store.getState().user.isLoggedIn)
    //console.log(store.getState().user.accessToken)
  }
  const accessToken = useSelector((state) => state.user.accessToken)
  const refreshToken = useSelector((state) => state.user.refreshToken)
  const handleLogOut = async () => {
    console.log(accessToken);
    console.log(refreshToken);
    const response = await Request("user/logout", "POST", {refreshToken}, accessToken)
    console.log(response);
    dispatch(setLoggedOut())
    dispatch(setToken(''))
    dispatch(setRefreshToken(''))
    await Delete('accessToken')
    await Delete('refreshToken')
    console.log(store.getState().user.accessToken)
  }


  // Collapsible Header
  const scrollValue = useSharedValue(0)
  const buttonValue = useSharedValue(0)

  const H_MAX_HEIGHT = 0;
  const H_MIN_HEIGHT = 30;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const translateSubHeader = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [0, -30]) : 0}
      ],
      opacity: scrollValue.value >= 0 ? interpolate(scrollValue.value, [0, -(H_SCROLL_DISTANCE/2)], [1, 0]) : 1
    }
  })
  
  const translateMainHeader = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: scrollValue.value <= 30 && scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [0,-10]) : scrollValue.value <= 0? 0 : -10}
      ],
      
    }
  })

  const translateMainHeaderBackground = useAnimatedStyle(() => {
    return {
      opacity: scrollValue.value <= 30 && scrollValue.value >= 15? interpolate(scrollValue.value, [15,30], [0,1]) : scrollValue.value <= 15? 0 : 1,
      // backgroundColor: interpolateColor(scrollValue.value, [-(H_SCROLL_DISTANCE/2), -H_SCROLL_DISTANCE], [COLORS.white, COLORS.mainBackground])
    }
  })

  const translateButton = useAnimatedStyle(() => {
    return {
      opacity: buttonValue.value,
      transform: [
        {scale: buttonValue.value}
      ],
    }
  })


  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Main Section
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return ( 
    <View style={[{height: height, width: width}]}>

      <LocateModal />
      <ScreenOverlay locate/>

      {/* ---------------------------------------------------------------- Header */}
      {/* Main Header */} 
      <Animated.View style={[{zIndex: 3}, translateMainHeader]}>
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        navigateButton
      />
     
      <Animated.View style={[styles.shadow, translateMainHeaderBackground]}></Animated.View>
      </Animated.View>

      {/* Sub Header */} 
      <Animated.View style={[{backgroundColor: 'transparent', zIndex: 2}, translateSubHeader]}>
          <SubHeader
            search
            onPressSearch={() => (
              navigation.navigate('Search'), 
              dispatch(setCategory('Angebote')), 
              dispatch(setSelectedCategory(3)),
              dispatch(setResetFilter())
            )}
            locateButton
            onPressLocate={handleLocate}
          /> 
      </Animated.View>

      {/* ---------------------------------------------------------------- Scroll View / Content Section */}
      <ScrollView 
        ref={scrollRef} 
        onScroll={(e) => {
          scrollValue.value = e.nativeEvent.contentOffset.y/2
          if (e.nativeEvent.contentOffset.y >= 30 && buttonValue.value == 0) {
            buttonValue.value = withTiming(1)
          } else if (e.nativeEvent.contentOffset.y < 30 && buttonValue.value == 1) {
            buttonValue.value = withTiming(0)
          }
        }}
        style={[styles.mainContainer, {overflow: 'visible'}]}
        scrollEventThrottle={16}

      >


        {/* -------------------------------- Category Section */}
        <PresentationHeader 
          title={'Kategorien'}
          // showAllButton
        />
        <View style={{marginLeft: 30}}>
          <Category 
            title={'Sushi'}
            number={16}
          />
        </View>

        {/* -------------------------------- New Offers Section */}
        <PresentationHeader 
          title={'Neue Angebote'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          <NewOfferBox />
        </View>

        {/* -------------------------------- New Shops Section */}
        <PresentationHeader 
          title={'Neue Shops'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          <NewShopsBox />
        </View>

        {/* -------------------------------- My Coupons Section */}
        <PresentationHeader 
          title={'Jetzt Einlösen'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          {logIn? <LogInRequiredBox onPress={() => runOnUI(dispatch(setPage('profile')))}/> : <CouponCard />}
        </View>

        {/* -------------------------------- More Offers Section */}
        <PresentationHeader 
          title={'Mehr Deals'}
          // showAllButton
          style={{marginTop: 25}}
        />
        <View style={{marginLeft: 30}}>
          <NewOfferBox />
        </View>


        
        
        
      

      </ScrollView>

      
      {/* Test LogIn */}
      <View style={{flexDirection: 'row', paddingHorizontal: 30, marginTop: 30, position: 'absolute', bottom: 100}}>
          <Button title='set log in' onPress={handleTestPress} color={COLORS.borderGrey}/>
          <Button title='set log out' onPress={handleLogOut} color={COLORS.grey}/>
      </View>
      {/* -------------------------------- Scroll To Top Button */}
      <Animated.View style={[{height: 38, width: 38, justifyContent: 'center', alignItems: 'center', right: 30, bottom: 105, position: 'absolute'}, translateButton]}>
      <RoundButton 
        icon={icons.Ionicons}
        iconName={'md-chevron-up'}
        iconSize={28}
        iconColor={COLORS.white}
        activeOpacity={1}
        style={{
            backgroundColor: COLORS.grey,
            height: 38,
            width: 38,
        }}
        onPressButton={() => scrollRef.current?.scrollTo({y: 0, animated: true})}
      />
      </Animated.View>

      

    </View>
  )
}

 //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  mainContainer: {
    height: height,
    width: width,
    marginBottom: 160,
    
  },

  shadow: {
    width: width,
    height: 110,
    position: 'absolute',
    backgroundColor: 'white',

    shadowColor:"#686868",
    shadowOffset: {
       width: 0,
       height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 0
  }

})