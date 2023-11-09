import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icons, { icons } from '../../components/components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import { width } from '../../constants/size'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function TabNavigator({
    onPressDiscover,
    onPressCoupons,
    onPressProfile,
    onPressStores,
    discoverFocussed,
    couponsFocussed,
    storesFocussed,
    profileFocussed,
    style,
}) {

    // -------------------------------------------------------------------------------------------------------------------------------------- Transition
    
    const animateDiscover = useSharedValue(1)
    const animateCoupons = useSharedValue(0)
    const animateStores = useSharedValue(0)
    const animateProfile = useSharedValue(0)

    const page = useSelector((state) => state.page.page)

    useEffect(() => {
        switch (page) {
            case 'discover': 
                animateDiscover.value = withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}), withTiming(0, {duration: 0}))
                break
            case 'coupons': 
                animateCoupons.value = withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}), withTiming(0, {duration: 0}))
                break
            case 'stores':
                animateStores.value = withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}), withTiming(0, {duration: 0}))
                break
            case 'profile':
                animateProfile.value = withSequence(withTiming(1, {duration: 100}), withTiming(0, {duration: 100}), withTiming(0, {duration: 0}))
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

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (

        <View style={[styles.tabNavigationContainer, style]}>

        {/* -------------------------------------------------------------------- Discover */}
        <Pressable style={styles.navIconContainer} onPress={onPressDiscover}>
            <Animated.View style={[styles.iconContainer, animationDiscover]}>
                <Icons
                    icon={icons.Octicons} 
                    iconName={'rocket'} 
                    iconSize={22} 
                    iconColor={ discoverFocussed == 1 ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: discoverFocussed == 1 ? COLORS.primary: COLORS.grey } ]}>Entdecken</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Coupons */}
        <Pressable style={styles.navIconContainer} onPress={onPressCoupons}>
            <Animated.View style={[styles.iconContainer, animationCoupons]}> 
                <Icons 
                    routeName={'coupons'} 
                    icon={icons.Feather} 
                    iconName={'percent'} 
                    iconSize={25} 
                    iconColor={ couponsFocussed == 1 ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: couponsFocussed == 1 ? COLORS.primary: COLORS.grey } ]}>Coupons</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Stores */}
        <Pressable style={styles.navIconContainer} onPress={onPressStores}>
            <Animated.View style={[styles.iconContainer, animationStores]}> 
                <Icons 
                    routeName={'stores'} 
                    icon={icons.MaterialCommunityIcons} 
                    iconName={'storefront-outline'} 
                    iconSize={25} 
                    iconColor={ storesFocussed == 1 ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: storesFocussed == 1 ? COLORS.primary: COLORS.grey } ]}>Stores</Text>
        </Pressable>

        {/* -------------------------------------------------------------------- Profile */}
        <Pressable style={styles.navIconContainer} onPress={onPressProfile}>
            <Animated.View style={[styles.iconContainer, animationProfile]}>
                <Icons 
                    routeName={'profile'} 
                    icon={icons.Feather} 
                    iconName={'user'} 
                    iconSize={25} 
                    iconColor={ profileFocussed == 1 ? COLORS.primary: COLORS.grey }
                />
            </Animated.View>
            <Text style={[ styles.labelStyle, { color: profileFocussed == 1 ? COLORS.primary: COLORS.grey } ]}>Profil</Text>
        </Pressable>

        </View>

    )
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    tabNavigationContainer: {
        height: 100,
        width: width,
        backgroundColor: COLORS.white,
        bottom: 0,
        position: 'absolute', 
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },

    navIconContainer: {
        height: 80,
        width: 80,
        //backgroundColor: 'green',
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
    }
})