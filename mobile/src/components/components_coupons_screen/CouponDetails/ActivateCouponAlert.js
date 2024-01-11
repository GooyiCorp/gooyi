import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Reanimated
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Constant
import { H4, T2 } from '../../../constants/text-style'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
// Components
import BigButton from '../../components_LogIn/BigButton'
import { setHideLeaveScreenAlert } from '../../../redux/slices/sendFeedbackSlice'
import { setHideActivateCouponAlert } from '../../../redux/slices/couponCardSlice'





// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ActivateCouponAlert({
    onRedeem
}) {

    // Redux
    const dispatch = useDispatch()
    const activateCouponAlert = useSelector((state) => state.couponCard.activateCouponAlert)

    // State
    const [showOverlay, setShowOverlay] = useState(false)

    // Reanimated
    const cardVal = useSharedValue(0)
    const backgroundOverlayVal = useSharedValue(0)
    // Card Style
    const translateCard = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: cardVal.value}
            ],
            opacity: interpolate(cardVal.value, [0.5,1], [0,1])
        }
    })
    // Overlay Style
    const translateOverlay = useAnimatedStyle(() => {
        return {
            opacity: backgroundOverlayVal.value
        }
    })

    // Handler
    useEffect(() => {
        if (activateCouponAlert) {
            setShowOverlay(true)
            backgroundOverlayVal.value = withTiming(1, {duration: 200}) 
            cardVal.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.34, 0.95, 0.76, 1.09)})
        } else {
            backgroundOverlayVal.value = withDelay(200, withTiming(0, {duration: 200}))
            cardVal.value = withDelay(200, withTiming(0, {duration: 300}))
            setTimeout(() => {
                setShowOverlay(false)
            }, 400)
        }
    }, [activateCouponAlert])

    // Button Handler
    // Handle Redeem
    const handleRedeem = () => {
        dispatch(setHideActivateCouponAlert())
        onRedeem()
    }
    // Handle Quit
    const handleQuit = () => {
        dispatch(setHideActivateCouponAlert())
        // setTimeout(() => {
        //     handleLeaveButton()
        // }, 300)
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<>
    {/* ------------------------------------------------ */}
    {/* Card */}
    {/* ------------------------------------------------ */}
    <Animated.View style={[styles.card, translateCard]}>
    {/* Info View */}
    <View style={{marginBottom: 20}}>
        <Text style={[H4, {textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>Coupon aktivieren!</Text>
        <Text style={[T2, {textAlign: 'center', marginTop: 10}]}>Dieser Coupon wird für <Text style={{fontFamily: 'RH-Medium', color: COLORS.primary}}>15 Minuten</Text> aktiviert. Tippe auf Einlösen wenn {"\n"}du dazu bereit bist!</Text>
    </View> 
    {/* Button View */}
    <View>
        <BigButton 
            title={'Einlösen'}
            bgStyle={{
                maxWidth: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                marginVertical: 0,
            }}
            titleStyle={{
                color: COLORS.white
            }}
            onPress={handleRedeem}
        />
        <BigButton 
            title={'Abbrechen'}
            bgStyle={{
                maxWidth: '100%',
                backgroundColor: COLORS.ivoryDark,
                borderRadius: 10,
                marginVertical: 0,
                marginTop: 10
            }}
            onPress={handleQuit}
        />
    </View>
    </Animated.View>
    {/* ------------------------------------------------ */}
    {/* Background Overlay */}
    {/* ------------------------------------------------ */}
    {showOverlay && <Animated.View style={[styles.overlay, translateOverlay]}>
        <Pressable 
            style={{height: height, width: width, position: 'absolute'}} 
            onPress={handleQuit}
        ></Pressable>
    </Animated.View>}
</>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    card: {
        width: 0.7*width,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        justifyContent: 'space-between',
        zIndex: 7,
        position: 'absolute',
        alignSelf: 'center',
        marginRight: 'auto'
    },

    overlay: {
        height: height,
        width: width,
        backgroundColor: COLORS.bgTransparencyDark,
        position: 'absolute',
        zIndex: 4,
    }
})