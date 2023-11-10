import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet,View, Text, Pressable } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import NoResults from '../../components/molecules/NoResults'
import { icons } from '../../components/components_universal/Icons'

import axios from 'axios'
import RoundButton from '../../components/components_universal/RoundButton'
import CouponsStackNav from '../../navigation/navigationStack/N-CouponsStack'
import { height, width } from '../../constants/size'
import { useNavigation } from '@react-navigation/native'
import LocateModal from '../../components/components_universal/LocateModal'
import SearchModal from '../../components/components_universal/SearchModal'
import InputBox from '../../components/components_LogIn/InputBox'
import AnimatedSuccessIcon from '../../components/components_universal/AnimatedSuccessIcon'
import SendNewLinkButton from '../../components/components_LogIn/SendNewLinkButton'
import LoadingCircle from '../../components/components_universal/LoadingCircle'
import CheckBox from '../../components/components_universal/CheckBox'
import NewInput from '../../components/components_LogIn/NewInput'
import SettingInput from '../../components/components_profile_screen/SettingInput'
import CloseSaveButton from '../../components/components_profile_screen/CloseSaveButton'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store'
import userSlice, { setLoggedOut, setLoggedIn, setToken, setRefreshToken } from '../../redux/slices/userSlice'
import IconLabelButton from '../../components/components_universal/IconLabelButton'
import { Delete } from '../../helper/store'
import { api_url } from '../../constants/api'
import Request from '../../helper/request'
import NewOfferBox from '../../components/components_discover_screen/NewOfferBox'
import NewShopsBox from '../../components/components_discover_screen/NewShopsBox'
import Category from '../../components/components_discover_screen/Category'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {
  hideTabNav,
  showTabNav,
} ) {
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

  const dispatch = useDispatch();


  // Locate Modal ----------------------------------------------------------------------
  const [showLocateModal, setShowLocateModal] = useState(false)
  const onCloseLocateModal = () => {
        showTabNav()
        setTimeout(() => {
          setShowLocateModal(false);
        }, 300) }
  const handleLocate = () => {
          setShowLocateModal(true)
          hideTabNav()
      }

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
    const response = await Request("user/logout", "POST", {refreshToken}, true)
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

  const H_MAX_HEIGHT = 0;
  const H_MIN_HEIGHT = 30;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const translateSubHeader = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: scrollValue.value >= 0 ? interpolate(scrollValue.value, [0,H_SCROLL_DISTANCE], [H_MAX_HEIGHT, H_MIN_HEIGHT]) : 0}
      ],
      opacity: scrollValue.value >= 0 ? interpolate(scrollValue.value, [0, -(H_SCROLL_DISTANCE/2)], [1, 0]) : 1

      
    }
  })
  
  const translateMainHeader = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(scrollValue.value, [-(H_SCROLL_DISTANCE/2), -H_SCROLL_DISTANCE], [COLORS.white, COLORS.mainBackground])
    }
  })
  return ( 
    <View style={[{height: height, width: width}]}>
      
      {showSearchModal && <View style={{zIndex: 4}}><SearchModal onClose={onCloseSearchModal}/></View>}
      {showLocateModal && <View style={{zIndex: 4}}><LocateModal onClose={onCloseLocateModal}/></View>}

      {/* Main Header */} 
      <Animated.View style={[{zIndex: 2}, translateMainHeader]}>
      <MainHeader 
        title='Entdecken'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        navigateButton
      />
      </Animated.View>

      {/* Sub Header */} 
      

      <Animated.View style={[{backgroundColor: 'transparent', zIndex: 2}, translateSubHeader]}>
          <SubHeader
            search
            onPressSearch={handleSearch}
            locateButton
            onPressLocate={handleLocate}
            iconState={showSearchModal}
          /> 
      </Animated.View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <ScrollView 
        onScroll={(e) => {
          scrollValue.value = e.nativeEvent.contentOffset.y/2
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





        <Button title='set log in' onPress={handleTestPress}/>
        <Button title='set log out' onPress={handleLogOut}/>


        {/* <Pressable onPressIn={onPressIn} onPressOut={onPressOut}><Text>Test</Text></Pressable> */}
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

      </ScrollView>



      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      

    </View>
  )
}

const styles = StyleSheet.create({

  mainContainer: {
    height: height,
    width: width,
    marginBottom: 100,
  },

})