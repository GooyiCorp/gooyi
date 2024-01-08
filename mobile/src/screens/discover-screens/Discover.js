import React, {useEffect, useRef, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet,View } from 'react-native'
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DiscoverScreen( {
  hideTabNav,
  showTabNav,
} ) {
  
  // Test List - (Delete)
  const offersList = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4}
  ] 

// React Navigation
const navigation = useNavigation()

// Redux
const dispatch = useDispatch()

const logIn = !useSelector((state) => state.user.isLoggedIn)
const longitude = useSelector((state) => state.locate.long)
const latitude = useSelector((state) => state.locate.lat)
const accessToken = useSelector((state) => state.user.accessToken)
const refreshToken = useSelector((state) => state.user.refreshToken)

  // Test Handle (Delete)
  const handleTestPress = () => {
    dispatch(setLoggedIn())
  }

  const handleLogOut = async () => {
    // console.log(accessToken);
    // console.log(refreshToken);
    const response = await Request("user/profile/logout", "POST", {refreshToken}, accessToken)
    console.log(response);
    dispatch(setLoggedOut())
    dispatch(setToken(''))
    dispatch(setRefreshToken(''))
    await Delete('accessToken')
    await Delete('refreshToken')
    // console.log(store.getState().user.accessToken)
  }

  // ----------------------------  
  // Get Data Section
  // ---------------------------- 
  // ---- Categories fetching
  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    const response = await Request(`user/categories?longitude=${longitude}&latitude=${latitude}&radius=${10000}`)
    if (response.success) {
      setCategories(response.data)
    }
  } 
  useEffect(() => {
    getCategories()
  }, [longitude, latitude])

  // ---- Store fetching
  const [stores, setStores] = useState([])
  const getStores = async () => {
    const response = await Request(`user/store?longitude=${longitude}&latitude=${latitude}&radius=${10000}&neu=true`)
    setStores(response.data)
  }
  useEffect(() => {
    getStores()
  }, [longitude, latitude])

  // ----------------------------  
  // Show Modal Section
  // ---------------------------- 
  // ---- start - Locate Modal
    // Value Section
    const showLocateModal = useSelector((state) => state.showModal.locateModal)
    // Handle Show Locate Modal
    const handleLocate = () => {
      showLocateModal? dispatch(setHideLocateModal()) : dispatch(setShowLocateModal())
    }
    // Check State - Hide / Show : Bottom Tab Bar
    useEffect(() => {
      showLocateModal? hideTabNav() : showTabNav()
    }, [showLocateModal])
  // ---- end - Locate Modal
  
  // ----------------------------  
  // Animation Section
  // ---------------------------- 
  // ---- start - Main Scroll Section
    // ---- Value Section
    const scrollRef = useRef()
    const scrollValue = useSharedValue(0)
    const buttonValue = useSharedValue(0)
    // ---- Animated Style
      const translateHeaderContainer = useAnimatedStyle(() => {
        return {
          height: scrollValue.value <= 30 && scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [170, 110]) : scrollValue.value <= 0? 170 : 110
        }
      })
      // Sub Header Style
      const translateSubHeader = useAnimatedStyle(() => {
        return {
          transform: [
            {translateY: scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [0, -30]) : 0}
          ],
          opacity: scrollValue.value >= 0 ? interpolate(scrollValue.value, [0, 15], [1, 0]) : 1
        }
      })
      // Main Header Style
      const translateMainHeader = useAnimatedStyle(() => {
        return {
          transform: [
            {translateY: scrollValue.value <= 30 && scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [0,-10]) : scrollValue.value <= 0? 0 : -10}
          ],
        }
      })
      // Header Background Style
      const translateMainHeaderBackground = useAnimatedStyle(() => {
        return {
          opacity: scrollValue.value <= 30 && scrollValue.value >= 15? interpolate(scrollValue.value, [15,30], [0,1]) : scrollValue.value <= 15? 0 : 1,
        }
      })
      // ScrollToTop Button Style
      const translateButton = useAnimatedStyle(() => {
        return {
          opacity: buttonValue.value,
          transform: [
            {scale: buttonValue.value}
          ],
        }
      })
  // ---- end - Main Scroll Section

  // ---- start - New Offer Scroll Section
    // Value Section
    const scrollXPosition = useSharedValue(0);
    const offerBoxWidth = useSharedValue(0)
    const inRange = useSharedValue(false)
    // Scroll Handler
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
  // ---- end - New Offer Scroll Section

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return ( 
<View style={styles.card}>
  {/* ---- start - Modal Section */}
    {/* Locate Modal */}
    <LocateModal />
    <ScreenOverlay locate delay={0}/>
  {/* ---- end - Modal Section */}

  {/* ---- start - Header Section */}
  <Animated.View style={[{zIndex: 5}, translateHeaderContainer]}>
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
  </Animated.View>
  {/* ---- end - Header Section */} 

  {/* ---- start - Main Scroll Area */}
  {/* Scroll */}
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
    {/* ------------------------------------------------ */}
    {/* Category Container */}
    {/* ------------------------------------------------ */}
    {/* Header */}
    <PresentationHeader 
      title={'Kategorien'}
      // showAllButton
    />
    {/* Map Category Items */}
    <View style={{marginLeft: 30}}>

      <FlatList 
        data={categories}
        renderItem={({item}) => <Category title={item.name} number={item.count} onPressCategory={() => navigation.navigate('ListByCategory', {name: item.name})}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{overflow: 'visible'}}
      />

    </View>

    {/* ------------------------------------------------ */}
    {/* New Offers Container */}
    {/* ------------------------------------------------ */}
    {/* Header */}
    <PresentationHeader 
      title={'Neue Angebote'}
      // showAllButton
      style={{marginTop: 25}}
    />
    {/* Map New Offers Items */}
    <View style={{marginLeft: 30}}>
      {/* ---- start - Animated Scroll */}
      <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode={"always"}
        onScroll={scrollHandler}
        onScrollEndDrag={(e) => {
          if (scrollXPosition.value > e.nativeEvent.contentSize.width+100) {
            navigation.navigate('ShowAllOffers')
          }
        }}
        scrollEventThrottle={16}
        style={{
          overflow: 'visible',
        }}
      >

        {/* Offer Items */}
        {offersList.map((offers) => (
          <NewOfferBox 
            key={offers.id}
          />
        ))}
        {/* Scroll to Navigate */}
        <ScrollToNavigateButton startValue={offerBoxWidth} endvalue={scrollXPosition}/>

      </Animated.ScrollView>
      {/* ---- end - Animated Scroll */}
    </View>

    {/* ------------------------------------------------ */}
    {/* New Shop Container */}
    {/* ------------------------------------------------ */}
    {/* Header */}
    <PresentationHeader 
      title={'Neue Shops'}
      // showAllButton
      style={{marginTop: 25}}
    />
    {/* Map New Shop Items */}
    <View style={{marginLeft: 30}}>

      <FlatList 
        data={stores}
        renderItem={({ item }) => <NewShopsBox shopName={item.name} description={item.description} distance={item.distance} onPressCard={() => navigation.navigate('Store', {screen: 'StoreEntry', params: {store_id: item.store_id}})}/>}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
          
    </View>

    {/* ------------------------------------------------ */}
    {/* My Coupons Container */}
    {/* ------------------------------------------------ */}
    {/* Header */}
    <PresentationHeader 
      title={'Jetzt Einlösen'}
      // showAllButton
      style={{marginTop: 25}}
    />
    {/* Map Coupon Items */}
    <View style={{marginLeft: 30}}>

      {logIn? 
        <LogInRequiredBox onPress={() => runOnUI(dispatch(setPage('profile')))}/> 
      : 
        <CouponCard />
      }
    
    </View>

    {/* ------------------------------------------------ */}
    {/* More Offers Container */}
    {/* ------------------------------------------------ */}
    {/* Header */}
    <PresentationHeader 
      title={'Mehr Deals'}
      // showAllButton
      style={{marginTop: 25}}
    />
    {/* Map Offers Items */}
    <View style={{marginLeft: 30}}>

      <NewOfferBox />

    </View>

  </ScrollView>
  {/* ---- end - Main Scroll Area */}

      
  {/* Test Element - LogIn - (Delete) */}
  <View style={{flexDirection: 'row', paddingHorizontal: 30, marginTop: 30, position: 'absolute', bottom: 100}}>
      <Button title='set log in' onPress={handleTestPress} color={COLORS.borderGrey}/>
      <Button title='set log out' onPress={handleLogOut} color={COLORS.grey}/>
  </View>

  {/* Scroll To Top Button */}
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
  {/* Header Background */}
  <Animated.View style={[styles.navHeaderBackground, translateMainHeader, translateMainHeaderBackground]}>
    <View style={{width: width, height: 110, overflow: 'hidden'}}>
      <BlurView intensity={18} tint='default' style={{height: height, width: width}}></BlurView>
    </View>
    <View style={[{height: 110, width: width, backgroundColor: COLORS.mainBackground, position: 'absolute', opacity: 0.7}, styles.shadow]}></View>
  </Animated.View>

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },

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