import React, {useEffect, useRef } from 'react'
import { Button, ScrollView, StyleSheet,View } from 'react-native'
// Reanimated
import Animated, { interpolate, runOnJS, runOnUI, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// Haptics
import * as Haptics from 'expo-haptics';
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Helpers
import { Delete } from '../../helper/store'
import Request from '../../helper/request'
// Expo Blur
import { BlurView } from 'expo-blur';
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store'
import { setPage } from '../../redux/slices/mainNavSlice'
import { setLoggedOut, setLoggedIn, setToken, setRefreshToken } from '../../redux/slices/userSlice'
import { setCategory, setOnSearchScreen, setResetFilter, setSelectedCategory } from '../../redux/slices/searchSlice'
import { setHideLocateModal, setShowLocateModal } from '../../redux/slices/showModalSlice'
// Components
import { MainHeader, SubHeader } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import LocateModal from '../../components/components_locate_screen/LocateModal'
import { icons } from '../../components/components_universal/Icons'
import NewOfferBox from '../../components/components_discover_screen/OfferCard/NewOfferBox'
import NewShopsBox from '../../components/components_discover_screen/NewShopsBox'
import RoundButton from '../../components/components_universal/RoundButton'
import CouponCard from '../../components/components_coupons_screen/CouponCard'
import LogInRequiredBox from '../../components/components_discover_screen/LogInRequiredBox'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'
import ScrollToNavigateButton from '../../components/components_universal/ScrollToNavigateButton'
import Category from '../../components/components_discover_screen/Category';

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {
  hideTabNav,
  showTabNav,
} ) {

  const offersList = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4}
  ] 
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
  const scrollXPosition = useSharedValue(0);
  const offerBoxWidth = useSharedValue(0)
  const inRange = useSharedValue(false)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
        const { x } = event.contentOffset;
        scrollXPosition.value = x+width;
        offerBoxWidth.value = event.contentSize.width
        if (scrollXPosition.value > offerBoxWidth.value+100) { 
          if (inRange.value == false) {
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy)
            inRange.value = true
          }
        } else inRange.value = false;

    }
  });
  // const [animation, setAnimation] = useState(0) 
  

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Main Section
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return ( 
    <View style={[{height: height, width: width, overflow: 'hidden'}]}>
      {/* <LocateRequired/> */}
      <LocateModal />
      <ScreenOverlay locate delay={0}/>

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
      </Animated.View>

      {/* Sub Header */} 
      <Animated.View style={[{backgroundColor: 'transparent', zIndex: 2}, translateSubHeader]}>
          <SubHeader
            search
            onPressSearch={() => (
              navigation.navigate('Search'), 
              dispatch(setCategory('Angebote'))
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

          <Animated.ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            overScrollMode={"always"}
            onScroll={scrollHandler}

            // onScrollBeginDrag={(e) => {
            //   setOfferBoxWidth(e.nativeEvent.contentSize.width)
            //   console.log(offerBoxWidth)
            // }}
            onScrollEndDrag={(e) => {
              if (scrollXPosition.value > e.nativeEvent.contentSize.width+100) {
                navigation.navigate('ShowAllOffers')
              }
            }}
            scrollEventThrottle={16}
          >

            {offersList.map((offers) => (<NewOfferBox key={offers.id}/>))}
            <ScrollToNavigateButton startValue={offerBoxWidth} endvalue={scrollXPosition}/>

          </Animated.ScrollView>
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

      {/* ----------------------------- Nav Background */}
      <Animated.View style={[styles.navHeaderBackground, translateMainHeader, translateMainHeaderBackground]}>
        <View style={{width: width, height: 110, overflow: 'hidden'}}>
          <BlurView intensity={18} tint='default' style={{height: height, width: width}}></BlurView>
        </View>
        <View style={[{height: 110, width: width, backgroundColor: COLORS.mainBackground, position: 'absolute', opacity: 0.7}, styles.shadow]}></View>
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

  navHeaderBackground: {
    width: width,
    height: 110,
    position: 'absolute',
    justifyContent: 'flex-end',
  },

  shadow: {
    shadowColor:COLORS.ivoryDark2,
    shadowOffset: {
       width: 0,
       height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 0
  }

})