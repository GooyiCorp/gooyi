import React, { useRef } from 'react'
import { ScrollView, StyleSheet, View} from 'react-native'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setResetFilter, setSelectedCategory } from '../../redux/slices/searchSlice'
// Reanimated
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// Expo Blur
import { BlurView } from 'expo-blur'
// Components
import { MainHeader, SubHeader } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import LogInRequired from '../logIn-screens/LogInRequired'
import OfferBoxL from '../../components/components_coupons_screen/OfferBoxL'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({
}) {
// React Navigation
const navigation = useNavigation()
// Redux
const dispatch = useDispatch()

const logIn = !useSelector((state) => state.user.isLoggedIn)
const couponActivePage = useSelector((state) => state.subNav.couponNavPage)

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
          height: scrollValue.value <= 30 && scrollValue.value >= 0? interpolate(scrollValue.value, [0,30], [160, 100]) : scrollValue.value <= 0? 160 : 100
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.card}>
  {/* Log In Rquired Overlay */}
  {logIn && 
    <LogInRequired />
  }
  {/* ---- start - Header Section */}
  <Animated.View style={[{zIndex: 5, position: 'absolute'}, translateHeaderContainer]}>
    {/* Main Header */}
    <Animated.View style={[{zIndex: 3}, translateMainHeader]}>
      <MainHeader 
        title='Coupons'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />
    </Animated.View>
    {/* Sub Header */}
    <Animated.View style={[{backgroundColor: 'transparent', zIndex: 2}, translateSubHeader]}>
      <SubHeader
        search
        onPressSearch={() => (
          navigation.navigate('Search'),
          dispatch(setCategory('Coupons')),
          dispatch(setResetFilter())
        )}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Merkliste', payload: 'marks'},
          {id: 2, title: 'Meine Coupons', payload: 'myCoupons'},
        ]}
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
    {/* Marks Container */}
    {/* ------------------------------------------------ */}
    {couponActivePage == 'marks' && 
      <>
        {/* Header */}
        <PresentationHeader 
          title={'Merkliste'}
          // showAllButton
        />
        {/* Map Offers Items */}
        <View style={{marginLeft: 30}}>
          
          <OfferBoxL />
          
        </View>
      </>
    }
    {/* ------------------------------------------------ */}
    {/* My Coupons Container */}
    {/* ------------------------------------------------ */}
    {couponActivePage == 'myCoupons' && 
      <>
        {/* Header */}
        <PresentationHeader 
          title={'Meine Coupons'}
          // showAllButton
        />
      </>
    }
  </ScrollView>
  {/* ---- end - Main Scroll Area */} 

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
    marginBottom: 110,
    paddingTop: 60,
    marginTop: 100,
  },

  navHeaderBackground: {
    width: width,
    height: 110,
    position: 'absolute',
    justifyContent: 'flex-end',
  },

  shadow: {
    shadowColor: COLORS.ivoryDark2,
    shadowOffset: {
       width: 0,
       height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 0
  },

})