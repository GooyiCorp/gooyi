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
import { setHideActivateCouponAlert, setHideTimeEndAlert } from '../../../redux/slices/couponCardSlice'





// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TimeEndAlert({
    onClose
}) {

    // Redux
    const dispatch = useDispatch()
    const timeEndAlert = useSelector((state) => state.couponCard.timeEndAlert)

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
        if (timeEndAlert) {
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
    }, [timeEndAlert])

    // Button Handler
    // Handle Close
    const handleClose = () => {
        dispatch(setHideTimeEndAlert())
        onClose()
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
        <Text style={[H4, {textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>Zeit abgelaufen!</Text>
        <Text style={[T2, {textAlign: 'center', marginTop: 10}]}>Zur Einlösung muss dieser Coupon erneut aktiviert werden.</Text>
    </View> 
    {/* Button View */}
    <View>
        <BigButton 
            title={'Zurück'}
            bgStyle={{
                maxWidth: '100%',
                backgroundColor: COLORS.ivoryDark,
                borderRadius: 10,
                marginVertical: 0,
            }}
            onPress={handleClose}
        />
    </View>
    </Animated.View>
    {/* ------------------------------------------------ */}
    {/* Background Overlay */}
    {/* ------------------------------------------------ */}
    {showOverlay && <Animated.View style={[styles.overlay, translateOverlay]}>
        <Pressable 
            style={{height: height, width: width, position: 'absolute'}} 
            onPress={handleClose}
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