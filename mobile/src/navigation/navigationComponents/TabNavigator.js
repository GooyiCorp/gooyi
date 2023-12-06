import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Icons, { icons } from '../../components/components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'

import { useDispatch, useSelector} from 'react-redux'
import { setLock, setPage, setUnlock } from '../../redux/slices/mainNavSlice'
import { BlurView } from 'expo-blur'

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function TabNavigator({
    handleShowDiscover,
    handleShowStores,
    handleShowCoupons,
    handleShowProfile,
    style,
    selectedPage,
}) {
    
    // -------------------------------------------------------------------------------------------------------------------------------------- Transition
    const dispatch = useDispatch()
    const page = selectedPage
    
    const animateDiscover = useSharedValue(0)
    const animateCoupons = useSharedValue(0)
    const animateStores = useSharedValue(0)
    const animateProfile = useSharedValue(0)

    useEffect(() => {
    switch (page) {
        case 'discover': 
            console.log('B')
            animateDiscover.value = withDelay(100, withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}) ) )
            handleShowDiscover()
            break
        case 'coupons': 
            animateCoupons.value = withDelay(100, withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}) ) )
            handleShowCoupons()
            break
        case 'stores':
            animateStores.value = withDelay(100, withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}) ) )
            handleShowStores()
            break
        case 'profile':
            animateProfile.value = withDelay(100, withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}) ) )
            handleShowProfile()
            break
    }
    }, [page])

    const animationDiscover = useAnimatedStyle( () =>{
        const scale = interpolate(animateDiscover.value, [0,1,0], [1,0.8,1,1])
            return {
                transform: [{scale: scale}],
            }
        }
    )

    const animationCoupons = useAnimatedStyle( () =>{
        const scale = interpolate(animateCoupons.value, [0,1,0], [1,0.8,1,1])
            return {
                transform: [{scale: scale}],
            }
        }
    )

    const animationStores = useAnimatedStyle( () =>{
        const scale = interpolate(animateStores.value, [0,1,0], [1,0.8,1,1])
            return {
                transform: [{scale: scale}],
            }
        }
    )

    const animationProfile = useAnimatedStyle( () =>{
        const scale = interpolate(animateProfile.value, [0,1,0], [1,0.8,1,1])
            return {
                transform: [{scale: scale}],
            }
        }
    )
    const [lock, setLock] = useState(false)
    const changePage = (pageName) => {
        if (!lock) {
            console.log('A')
            dispatch(setPage(pageName))
            setLock(true)
            setTimeout(() => {
                setLock(false)
            }, 400)
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (

        <View style={[styles.tabNavigationContainer, style]}>

        {/* -------------------------------------------------------------------- Discover */}
        <Pressable style={styles.navIconContainer} onPress={() => changePage('discover')}>
            <Animated.View style={[styles.iconContainer, animationDiscover]}>
                <Icons
                    icon={icons.Octicons} 
                    iconName={'rocket'} 
                    iconSize={22} 
                    iconColor={ page == 'discover' ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: page == 'discover' ? COLORS.primary: COLORS.grey } ]}>Entdecken</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Coupons */}
        <Pressable style={styles.navIconContainer} onPress={() => changePage('coupons')}>
            <Animated.View style={[styles.iconContainer, animationCoupons]}> 
                <Icons 
                    routeName={'coupons'} 
                    icon={icons.Feather} 
                    iconName={'percent'} 
                    iconSize={25} 
                    iconColor={ page == 'coupons' ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: page == 'coupons' ? COLORS.primary: COLORS.grey } ]}>Coupons</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Stores */}
        <Pressable style={styles.navIconContainer} onPress={() => changePage('stores')}>
            <Animated.View style={[styles.iconContainer, animationStores]}> 
                <Icons 
                    routeName={'stores'} 
                    icon={icons.MaterialCommunityIcons} 
                    iconName={'storefront-outline'} 
                    iconSize={25} 
                    iconColor={ page == 'stores' ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: page == 'stores' ? COLORS.primary: COLORS.grey } ]}>Geschäfte</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Profile */}
        <Pressable style={styles.navIconContainer} onPress={() => changePage('profile')}>
            <Animated.View style={[styles.iconContainer, animationProfile]}>
                <Icons 
                    routeName={'profile'} 
                    icon={icons.Feather} 
                    iconName={'user'} 
                    iconSize={25} 
                    iconColor={ page == 'profile' ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: page == 'profile' ? COLORS.primary: COLORS.grey } ]}>Profil</Text>
        </Pressable>

        </View>

    )
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    tabNavigationContainer: {
        height: 85,
        width: width,
        backgroundColor: 'transparent',
        bottom: 0,
        position: 'absolute', 
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 25,
        overflow: 'hidden'
    },

    navIconContainer: {
        height: 60,
        width: 80,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconContainer: {
        height: 40,
        width: 40,
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    labelStyle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 10, 
        color: COLORS.subPrimary
    },
})