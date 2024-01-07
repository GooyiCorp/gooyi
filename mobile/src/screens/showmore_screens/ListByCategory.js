import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// Reanimated
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// Redux
import { useSelector } from 'react-redux'
// BlurView
import { BlurView } from 'expo-blur'
// Helpers
import Request from './../../helper/request';
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { icons } from '../../components/components_universal/Icons'
import StoreCard from '../../components/components_stores_screen/StoreCard'
import RoundButton from '../../components/components_universal/RoundButton'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ListByCategory({
  route,
  navigation,
  navigation: {goBack}
}) {

  // ----------------------------  
  // Get API Section
  // ---------------------------- 
  const { name } = route.params
  const longitude = useSelector((state) => state.locate.long)
  const latitude = useSelector((state) => state.locate.lat)
  // Store fetching
  const [stores, setStores] = useState([])
  const getStores = async () => {
    const response = await Request(`user/categories/store?name=${name}&longitude=${longitude}&latitude=${latitude}&radius=${10000}`, "GET", null)
    setStores(response.data);
  }
  useEffect(() => {
    getStores();
  }, [])

  // ----------------------------  
  // Scroll Animation Section
  // ---------------------------- 
  // ---- Value Section
  const scrollRef = useRef()
  const scrollValue = useSharedValue(0)
  const buttonValue = useSharedValue(0)

  // ---- Animated Style Section
  // Header Background Style
  const translateHeaderBackground = useAnimatedStyle(() => {
    return {
      opacity: scrollValue.value <= 15 && scrollValue.value >= 0? interpolate(scrollValue.value, [0,15], [0,1]) : scrollValue.value <= 0? 0 : 1,
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.card}>
  {/* Header Section */}
  <SettingHeader
    goBack
    onPressGoBack={() => goBack()}
    header
    headerText={'Pizza'}
    iconStyle={COLORS.mainBackground}
    selectorButton
  />
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
      style={{overflow: 'visible'}}
      scrollEventThrottle={16}
    >
    {/* ---- start - Map Scroll Item */}
    <View style={{paddingHorizontal: 30, paddingBottom: 30, paddingTop: 10}}>
      {stores.map((item, index) => (
        <StoreCard 
          key={index} 
          onPress={() => navigation.navigate('Store', { screen: 'StoreEntry', params: { store_id: item.store_id } })} 
          shopName={item.name} 
          description={item.description} 
          distance={item.distance}
        />
      ))}  
    </View>
    {/* ---- end - Map Scroll Item */}
  </ScrollView>
  {/* ---- end - Main Scroll Area */}
  {/* Scroll To Top Button */}
  <Animated.View style={[{height: 38, width: 38, justifyContent: 'center', alignItems: 'center', right: 30, bottom: 30, position: 'absolute'}, translateButton]}>
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
  <Animated.View style={[styles.navHeaderBackground, translateHeaderBackground]}>
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
  },

})