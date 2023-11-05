import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

import { height, width } from '../constants/size'

import DiscoverScreen from '../screens/root-screens/S-Discover'
import CouponsScreen from '../screens/root-screens/S-Coupons'
import TabNavigator from './navigationComponents/TabNavigator'
import StoresScreen from '../screens/root-screens/S-Stores'
import ProfileScreen from '../screens/root-screens/S-Profile'
import { COLORS } from '../index/constantsindex'
import * as Linking from "expo-linking";
import { Get, Save } from '../helper/store'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setRefreshToken, setToken } from '../redux/slices/userSlice'
import { store } from '../redux/store'

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function MainNav() {

    const navigation = useNavigation()

    const checkLogin = async () => {
        const accessToken = await Get('accessToken')
        const refreshToken = await Get('refreshToken')
        if (accessToken && refreshToken) {
          dispatch(setLoggedIn())
          dispatch(setToken(accessToken))
          dispatch(setRefreshToken(refreshToken))
          console.log(store.getState().user.accessToken)
          return true
        } else return false
    }
    // -------------------------------------------------------------------------------------------------------------------------------------- Transition
    const dispatch = useDispatch()
    var url = Linking.useURL()
    useEffect(() => {
        if (url) {
          const { hostname, path, queryParams } = Linking.parse(url);
          if (queryParams.error) {
            switch (queryParams.error) {
                case 'expired':
                    console.log('het han');
                    // lam gi day
                    break
                case 'logged_in':
                    console.log('da dang nhap');
                    // lam gi day
                    break
                case 'used':
                    console.log('da dung');
                    break
            }
          } else {
            if (queryParams.email) {
                navigation.navigate('RegisterEmail', {screen: 'EnterUserInformation', params: { email: queryParams.email }})
            }
            console.log(queryParams);

            if (queryParams.accessToken && queryParams.refreshToken) {
                dispatch(setLoggedIn())
                dispatch(setToken(queryParams.accessToken))
                dispatch(setRefreshToken(queryParams.refreshToken))
                Save('accessToken', queryParams.accessToken)
                Save('refreshToken', queryParams.refreshToken)
            }
          }
        }
        
    }, [url])
    // ---------------------------------------------------------------------- Screens Transition

    const showDiscover = useSharedValue(1)
    const showCoupons = useSharedValue(0)
    const showStores = useSharedValue(0)
    const showProfile = useSharedValue(0)

    const [indexDiscover, setIndexDiscover] = useState(1)
    const [indexCoupons, setIndexCoupons] = useState(0)
    const [indexStores, setIndexStores] = useState(0)
    const [indexProfile, setIndexProfile] = useState(0)
    
    const handleShowDiscover = () => {
        setIndexDiscover(1)
        setIndexCoupons(0)
        setIndexStores(0)
        setIndexProfile(0)
        showDiscover.value = withTiming(1, {duration: 500})  
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowCoupons = () => {
        setIndexDiscover(0)
        setIndexCoupons(1)
        setIndexStores(0)
        setIndexProfile(0)
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withTiming(1, {duration: 500})
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowStores = () => {
        setIndexDiscover(0)
        setIndexCoupons(0)
        setIndexStores(1)
        setIndexProfile(0)
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withTiming(1, {duration: 500})
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowProfile = () => {
        setIndexDiscover(0)
        setIndexCoupons(0)
        setIndexStores(0)
        setIndexProfile(1)
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withTiming(1, {duration: 500})
    }
      
    const transitionDiscover = useAnimatedStyle( () =>{
        const translateY = interpolate(showDiscover.value, [0,1], [height,0])
        const opacity = interpolate(showDiscover.value, [0,1], [0,1])
            return {
                zIndex: indexDiscover,
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionCoupons = useAnimatedStyle( () =>{
        const translateY = interpolate(showCoupons.value, [0,1], [height,0])
        const opacity = interpolate(showCoupons.value, [0,1], [0,1])
            return {
                zIndex: indexCoupons,
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionStores = useAnimatedStyle( () =>{
        const translateY = interpolate(showStores.value, [0,1], [height,0])
        const opacity = interpolate(showStores.value, [0,1], [0,1])
            return {
                zIndex: indexStores,
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionProfile = useAnimatedStyle( () =>{
        const translateY = interpolate(showProfile.value, [0,1], [height,0])
        const opacity = interpolate(showProfile.value, [0,1], [0,1])
            return {
                zIndex: indexProfile,
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    // ---------------------------------------------------------------------- Bottom Tab Transition

    const bottomTabTransition = useSharedValue(1)

    const showBottomTab = () => {
        bottomTabTransition.value = withTiming(1, {duration: 300})
    }
    const hideBottomTab = () => {
        bottomTabTransition.value = withTiming(0, {duration: 300})
    }

    const animateBottomTab = useAnimatedStyle( () => {
        const opacity = interpolate(bottomTabTransition.value, [0,1], [0, 1])
            return {
                opacity: opacity
            }
        }
    )

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    return (

    <View style={{flex:1}}>
        {/* -------------------------------------------------------------------- Tab Navigation */}
        <Animated.View style={[{zIndex: 2, position: 'absolute', bottom: 0}, animateBottomTab]}>
            <TabNavigator
                onPressDiscover={handleShowDiscover}
                onPressCoupons={handleShowCoupons}
                onPressStores={handleShowStores}
                onPressProfile={handleShowProfile}
                discoverFocussed={indexDiscover}
                couponsFocussed={indexCoupons}
                storesFocussed={indexStores}
                profileFocussed={indexProfile}
                style={{ backgroundColor: 'transparent'}}
            />
        </Animated.View>

        {/* -------------------------------------------------------------------- Discover */}
        <Animated.View style={[styles.screenContainer, transitionDiscover]}>
            <DiscoverScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab} />
        </Animated.View>

        {/* -------------------------------------------------------------------- Coupons */}
        <Animated.View style={[styles.screenContainer, transitionCoupons]}>
            <CouponsScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab}/>
        </Animated.View>

        {/* -------------------------------------------------------------------- Stores */}
        <Animated.View style={[styles.screenContainer, transitionStores]}>
            <StoresScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab}/>
        </Animated.View>

        {/* -------------------------------------------------------------------- Profile */}
        <Animated.View style={[styles.screenContainer, transitionProfile]}>
            <ProfileScreen/>
        </Animated.View>

    </View>
    
    )
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
   
    screenContainer: {
        height: height,
        width: width,
        position: 'absolute',
        zIndex: 0,
        backgroundColor: COLORS.white,
    },

})