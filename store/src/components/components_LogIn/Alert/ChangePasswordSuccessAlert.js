import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Reanimated
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H4, T2 } from '../../../helper/constants/text'
import BigButton from '../../universal/Buttons/BigButton'
import { setHideChangePasswordSuccessAlert } from '../../../redux/slices/changePasswordSlice'
// Constant

// Components






// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ChangePasswordSuccessAlert({
    onPressButton
}) {

    // Redux
    const dispatch = useDispatch()
    const changePasswordSuccessAlert = useSelector((state) => state.changePassword.changePasswordSuccessAlert)

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
        if (changePasswordSuccessAlert) {
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
    }, [changePasswordSuccessAlert])

    // Button Handler
    // Handle Close
    const handleButton = () => {
        dispatch(setHideChangePasswordSuccessAlert())
        onPressButton()
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
        <Text style={[H4, {textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>Dein Passwort wurde erfolgreich geändert!</Text>
        <Text style={[T2, {textAlign: 'center', marginTop: 10}]}>Du kannst dich jetzt mit deinem neuen Passwort auf Gooyi anmelden.</Text>
    </View> 
    {/* Button View */}
    <View>
        <BigButton 
            label={'Weiter'}
            styleContainer={{
                maxWidth: '100%',
                backgroundColor: COLORS.ivoryDark,
                borderRadius: 10,
                marginVertical: 0,
            }}
            styleLabel={{
                color: COLORS.grey
            }}
            onPress={handleButton}
        />
    </View>
    </Animated.View>
    {/* ------------------------------------------------ */}
    {/* Background Overlay */}
    {/* ------------------------------------------------ */}
    {showOverlay && <Animated.View style={[styles.overlay, translateOverlay]}>
        <Pressable 
            style={{height: height, width: width, position: 'absolute'}} 
            onPress={handleButton}
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