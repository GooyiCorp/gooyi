import { StyleSheet, View, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { acc, interpolate, runOnUI, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

import { height, width } from '../constants/size'

import DiscoverScreen from '../screens/root-screens/S-Discover'
import CouponsScreen from '../screens/root-screens/S-Coupons'
import TabNavigator from './navigationComponents/TabNavigator'
import StoresScreen from '../screens/root-screens/S-Stores'
import ProfileScreen from '../screens/root-screens/S-Profile'
import { COLORS } from '../index/constantsindex'
import { Delete, Get, Save } from '../helper/store'
import { Link, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setLoggedOut, setRefreshToken, setToken } from '../redux/slices/userSlice'
import { store } from '../redux/store'
import { setPage } from '../redux/slices/mainNavSlice'
import Request from '../helper/request.js'
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function MainNav({route}) {
    const dispatch = useDispatch()

    const { accessToken, refreshToken } = (typeof route.params != 'undefined') ? route.params : {accessToken: '', refreshToken: ''} 
    const checkLogin = async (accessToken, refreshToken) => {
        const access = accessToken ? accessToken : await Get('accessToken')
        const refresh = refreshToken ? refreshToken : await Get('refreshToken')
        if (access && refresh) {
            const response = await Request('auth/verify-token', 'POST', {accessToken: access, refreshToken: refresh})
            if (response.success) {
                dispatch(setLoggedIn())
                dispatch(setToken(access))
                dispatch(setRefreshToken(refresh))
                await Save("accessToken", access)
                await Save("refreshToken", refresh)
                return true
            } 
        }
        dispatch(setLoggedOut())
        dispatch(setToken(''))
        dispatch(setRefreshToken(''))
        await Delete('accessToken')
        await Delete('refreshToken')
    }
    useEffect(() => {
        checkLogin(accessToken, refreshToken)
    }, [route.params])
    
    // ---------------------------------------------------------------------- Screens Transition
    const page = useSelector((state) => state.page.page)
    
    const showDiscover = useSharedValue(1)
    const showCoupons = useSharedValue(0)
    const showStores = useSharedValue(0)
    const showProfile = useSharedValue(0)
    
    const handleShowDiscover = () => {
        showDiscover.value = withTiming(1, {duration: 500})  
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowCoupons = () => {
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withTiming(1, {duration: 500})
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowStores = () => {
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withTiming(1, {duration: 500})
        showProfile.value = withDelay(500, withTiming(0))
    }

    const handleShowProfile = () => {
        showDiscover.value = withDelay(500, withTiming(0))
        showCoupons.value = withDelay(500, withTiming(0))
        showStores.value = withDelay(500, withTiming(0))
        showProfile.value = withTiming(1, {duration: 500})
    }
      
    const transitionDiscover = useAnimatedStyle( () =>{
        const translateY = interpolate(showDiscover.value, [0,1], [height,0])
        const opacity = interpolate(showDiscover.value, [0,1], [0,1])
            return {
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionCoupons = useAnimatedStyle( () =>{
        const translateY = interpolate(showCoupons.value, [0,1], [height,0])
        const opacity = interpolate(showCoupons.value, [0,1], [0,1])
            return {
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionStores = useAnimatedStyle( () =>{
        const translateY = interpolate(showStores.value, [0,1], [height,0])
        const opacity = interpolate(showStores.value, [0,1], [0,1])
            return {
                transform: [{translateY: translateY}],
                opacity: opacity
            }
        }
    )

    const transitionProfile = useAnimatedStyle( () =>{
        const translateY = interpolate(showProfile.value, [0,1], [height,0])
        const opacity = interpolate(showProfile.value, [0,1], [0,1])
            return {
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
                transform: [
                    {translateY: interpolate(bottomTabTransition.value, [0,1], [85, 0])}
                ],
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
                selectedPage={page}

                handleShowDiscover={handleShowDiscover}
                handleShowCoupons={handleShowCoupons}
                handleShowStores={handleShowStores}
                handleShowProfile={handleShowProfile}
                
                style={{ 
                    backgroundColor: COLORS.white,
                            
                    shadowColor:"#686868",
                    shadowOffset: {
                       width: 0,
                       height: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 0
                      
                }}
            />
        </Animated.View>

        {/* -------------------------------------------------------------------- Discover */}
        <Animated.View style={[
            styles.screenContainer, 
            {zIndex: page == 'discover' ? 1 : 0}, 
            transitionDiscover
        ]}>
            <DiscoverScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab} />
        </Animated.View>

        {/* -------------------------------------------------------------------- Coupons */}
        <Animated.View style={[
            styles.screenContainer,
            {zIndex: page == 'coupons' ? 1 : 0}, 
            transitionCoupons,
        ]}>
            <CouponsScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab}/>
        </Animated.View>

        {/* -------------------------------------------------------------------- Stores */}
        <Animated.View style={[
            styles.screenContainer, 
            {zIndex: page == 'stores' ? 1 : 0}, 
            transitionStores,
        ]}>
            <StoresScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab}/>
        </Animated.View>

        {/* -------------------------------------------------------------------- Profile */}
        <Animated.View style={[
            styles.screenContainer,
            {zIndex: page == 'profile' ? 1 : 0},  
            transitionProfile,
        ]}>
            <ProfileScreen hideTabNav={hideBottomTab} showTabNav={showBottomTab}/>
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
        backgroundColor: COLORS.white,
    },

})