import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
// Reanimated
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Constant
import { H1, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
// Components
import { setHideMessageSendAlert } from '../../../redux/slices/sendFeedbackSlice'
import BigButton from '../../components_LogIn/BigButton'
import { setPage } from '../../../redux/slices/mainNavSlice'






export default function MessageSendAlert({
    handleLeave
}) {

    // Redux
    const dispatch = useDispatch()
    const messageSendAlert = useSelector((state) => state.storeFeedback.messageSendAlert)

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
        if (messageSendAlert) {
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
    }, [messageSendAlert])

    // Button Handler
    // Handle GoBack
    const handleGoBack = () => {
        dispatch(setHideMessageSendAlert())
        setTimeout(() => {
            handleLeave()
        }, 300)
    }

// ----------------------------------------------------------------------------------------------------------------
// RETURN
// ----------------------------------------------------------------------------------------------------------------
  return (
    <>
    {/* ------------------------------------------------ */}
    {/* Card */}
    {/* ------------------------------------------------ */}
    <Animated.View style={[styles.card, translateCard]}>
    {/* Image View */}
    <View style={styles.imageContainer}>
        <Image source={require('../../../../assets/image/fox-happy.png')} resizeMode='contain' style={{maxWidth: '100%'}}/>
    </View>
    {/* Info View */}
    <View style={{marginTop: 20}}>
        <Text style={[H1, {textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>Danke!</Text>
        <Text style={[T2, {textAlign: 'center', marginTop: 10, marginBottom: 20}]}>Wir haben deine Nachricht{"\n"} weitergeleitet.</Text>
        {/* <Text style={[T3, {textAlign: 'center', marginTop: 30, fontFamily: 'RH-Medium', color: COLORS.primary}]}>Tippe auf den Bildschirm um zurückzukehren!</Text> */}
    </View>
    {/* Go Back Button */}
    <BigButton
        title={'Zurück zur Startseite'}
        bgStyle={{
            maxWidth: '100%',
            backgroundColor: COLORS.grey,
            borderRadius: 10,
            marginVertical: 0,
        }}
        titleStyle={{
            color: COLORS.white
        }}
        onPress={handleGoBack}
    />
    </Animated.View>
    {/* ------------------------------------------------ */}
    {/* Background Overlay */}
    {/* ------------------------------------------------ */}
    {showOverlay && <Animated.View style={[styles.overlay, translateOverlay]}>
        <Pressable style={{height: height, width: width, position: 'absolute'}} onPress={handleGoBack}></Pressable>
    </Animated.View>}
    </>
  )
}

// ----------------------------------------------------------------------------------------------------------------
// STYLE
// ----------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    card: {
        width: 0.8*width,
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
    },

    imageContainer: {
        height: 0.7*width,
        width: 0.7*width,
        // backgroundColor: COLORS.mainBackground,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
})