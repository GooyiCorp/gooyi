import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setLoggedOut, setRefreshToken, setToken } from '../../redux/slices/userSlice.js'
// Reanimated
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
// Expo
import { BlurView } from 'expo-blur'
// Constant
import { height, width } from '../../constants/size.js'
import { COLORS } from '../../index/constantsindex.js'
// Helpers
import { Delete, Get, Save } from '../../helper/store.js'
import Request from '../../helper/request.js'
// Screens
import DiscoverScreen from '../../screens/discover-screens/Discover.js'
import CouponsScreen from '../../screens/coupons-screens/Coupons.js'
import StoresScreen from '../../screens/store_screens/Stores.js'
import ProfileScreen from '../../screens/profile_screens/Profile.js'
// Navigation Components
import TabNavigator from '../../components/components_navigation/TabNavigator.js'


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function MainNav({route}) {

    // Redux
    const dispatch = useDispatch()

    // Token Check
    const { accessToken, refreshToken } = (typeof route.params != 'undefined') ? route.params : {accessToken: '', refreshToken: ''} 
    const checkLogin = async (accessToken, refreshToken) => {
        const access = accessToken ? accessToken : await Get('accessToken')
        const refresh = refreshToken ? refreshToken : await Get('refreshToken')
        if (access && refresh) {
            const response = await Request('auth/token/verify-token', 'POST', {accessToken: access, refreshToken: refresh})
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
    
    // Animation
    // ---------------------------------------------------------------------- Screens Transition
    const page = useSelector((state) => state.page.page)
    
    const showDiscover = useSharedValue(1)
    const showCoupons = useSharedValue(0)
    const showStores = useSharedValue(0)
    const showProfile = useSharedValue(0)
    
    const handleShowDiscover = () => {
        showDiscover.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.08, 0.35, 0.38, 0.99)})  
        showCoupons.value = withDelay(300, withTiming(0, {duration: 0}))
        showStores.value = withDelay(300, withTiming(0, {duration: 0}))
        showProfile.value = withDelay(300, withTiming(0, {duration: 0}))
    }

    const handleShowCoupons = () => {
        showDiscover.value = withDelay(300, withTiming(0, {duration: 0}))
        showCoupons.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.08, 0.35, 0.38, 0.99)})
        showStores.value = withDelay(300, withTiming(0, {duration: 0}))
        showProfile.value = withDelay(300, withTiming(0, {duration: 0}))
    }

    const handleShowStores = () => {
        showDiscover.value = withDelay(300, withTiming(0, {duration: 0}))
        showCoupons.value = withDelay(300, withTiming(0, {duration: 0}))
        showStores.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.08, 0.35, 0.38, 0.99)})
        showProfile.value = withDelay(300, withTiming(0, {duration: 0}))
    }

    const handleShowProfile = () => {
        showDiscover.value = withDelay(300, withTiming(0, {duration: 0}))
        showCoupons.value = withDelay(300, withTiming(0, {duration: 0}))
        showStores.value = withDelay(300, withTiming(0, {duration: 0}))
        showProfile.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.08, 0.35, 0.38, 0.99)})
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
        <Animated.View style={[{zIndex: 8, position: 'absolute', bottom: 0}, animateBottomTab]}>
            <TabNavigator
                selectedPage={page}

                handleShowDiscover={handleShowDiscover}
                handleShowCoupons={handleShowCoupons}
                handleShowStores={handleShowStores}
                handleShowProfile={handleShowProfile}
                
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

        {/* Bottom Tab Blured Background */}
        <Animated.View style={[styles.navBackground, animateBottomTab]}>
            <View style={{width: width, height: 110, overflow: 'hidden'}}>
                <BlurView intensity={18} tint='default' style={{height: height, width: width}}></BlurView>
            </View>
            <View style={[{height: 110, width: width, backgroundColor: COLORS.mainBackground, position: 'absolute', opacity: 0.7}, styles.shadow]}></View>
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

    navBackground: {
        width: width,
        height: 85,
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
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