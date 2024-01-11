import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H2, H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
// QR Code
import  {default as QR} from 'react-native-qrcode-svg';
// Redux
import { useDispatch } from 'react-redux'
import { setPage } from '../../redux/slices/mainNavSlice'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// Expo Blur
import { BlurView } from 'expo-blur'
// Map
import openMap from 'react-native-open-maps';
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import Icons, { icons } from '../../components/components_universal/Icons'
import BulletPointText from '../../components/components_universal/BulletPointText'
import RoundButton from '../../components/components_universal/RoundButton'
import BigButton from '../../components/components_LogIn/BigButton'
import CountdownTimer from '../../components/components_universal/countdown/CountdownTimer'
import { setShowActivateCouponAlert, setShowLeaveCouponScreenAlert, setShowTimeEndAlert, setUserAction } from '../../redux/slices/couponCardSlice'
import ActivateCouponAlert from '../../components/components_coupons_screen/CouponDetails/ActivateCouponAlert'
import TimeEndAlert from '../../components/components_coupons_screen/CouponDetails/TimeEndAlert'
import LeaveCouponScreenAlert from '../../components/components_coupons_screen/CouponDetails/LeaveCouponScreenAlert'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponCardDetail({
    navigation,
    navigation: {goBack}
}) {

// Redux
const dispatch = useDispatch()

const [qr, setQR] = useState(false)

    const handleGenerateQR = () => {
        setQR(true)
    }

    const handleActiveCoupon = () => {
        dispatch(setShowActivateCouponAlert())
    }

    const handleHideQR = () => {
        setQR(false)
    }

    const handleLeaveByAlert = () => {
        goBack()
    }

    const handleNavigateByAlert = () => {
        navigation.navigate('Main')
        setTimeout(() => {
            dispatch(setPage('coupons'))
        }, 300)
    }

    // Go Back Handle
    const handleGoBack = () => {
        dispatch(setUserAction('GoBack'))
        if (qr) {
            dispatch(setShowLeaveCouponScreenAlert())
        } else {
            goBack()
        }
    }
    // Navigate Shop
    const handleShowShop = () => {
        dispatch(setUserAction('Navigate'))
        if (qr) {
            dispatch(setShowLeaveCouponScreenAlert())
        } else {
            navigation.navigate('Main')
            setTimeout(() => {
                dispatch(setPage('coupons'))
            }, 300)
        }
    }
    // Open Map App Handle
    const handleOpenMap = () => {
        const options = { latitude: 53.07602610774151, longitude: 8.807934375600366, zoom: 20, query: "Rathaus"}
        openMap(options)
    }


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
    <ActivateCouponAlert onRedeem={handleGenerateQR}/>
    <TimeEndAlert onClose={handleHideQR}/>
    <LeaveCouponScreenAlert handleHideQR={handleHideQR} handleLeaveButton={handleLeaveByAlert} handleNavigateButton={handleNavigateByAlert}/>
    {/* Header */}
    <SettingHeader
        goBack
        onPressGoBack={handleGoBack}
        header
        headerText={'Coupon'}
        iconStyle={COLORS.mainBackground}
        next
        onPressNext={handleShowShop}
    /> 
    {/* ------------------------------------------------- */}
    {/* Info Section */}
    {/* ------------------------------------------------- */}
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
            {/* ---- start - Scroll Container */}
            <View style={{paddingHorizontal: 30, paddingBottom: 50}}>   
                
                {/* ------------------------------------------------- */}
                {/* Coupon Card Area */}
                {/* ------------------------------------------------- */}
                <View style={[styles.qrCodeContainer]}> 
                    {/* ---- start - Top Section */}
                    <View style={{width: '100%', paddingHorizontal: 5}}>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            {/* Store Name */}
                            <Text style={[T1, { marginBottom: 5}]}>Yoko Sushi</Text>
                            {/* Coupon Icon */}
                            <Icons
                                icon={icons.MaterialCommunityIcons}
                                iconName={'ticket-percent'}
                                iconSize={22}
                                iconColor={COLORS.grey}
                                iconStyle={{
                                    marginRight: -2
                                }}
                            />
                        </View>
                        
                        {/* Coupon Title */}
                        <Text style={[H4, {fontFamily: 'RH-Bold'}]}>1x Kostenloses Getränk</Text>
                        {/* Coupon Info */}
                        <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>Größe M</Text>
                        {/* Coupon Code */}
                        <Text style={[T4, {fontFamily: 'RH-Bold', marginTop: 20, marginBottom: 3}]}>Coupon Code</Text>
                        <Text style={[T2, {marginBottom: 5}]}>YS23-0021-7798-HH78</Text>
                        {/* Validity Date  */}
                        <Text style={[T4, {fontFamily: 'RH-Bold', marginBottom: 3}]}>Gültig bis</Text>
                        <Text style={[T2]}>30.06.2023</Text>
                        
                    </View>
                    {/* ---- end - Top Section */}

                    {/* ---- start - QR Code Section */}
                    <View style={{marginTop: 30, width: '100%'}}>
                        {!qr && 
                            <BigButton 
                                title='Jetzt Einlösen'
                                bgStyle={{
                                    width: '100%',
                                    height: 50,
                                    backgroundColor: COLORS.ivory,
                                    borderRadius: 10,
                                    marginVertical: 0
                                }}
                                titleStyle={{
                                    color: COLORS.grey,
                                }}  
                                onPress={handleActiveCoupon}
                            />
                        }

                    
                    </View> 
                        {qr && 
                            <>
                                <View style={{padding: 15, backgroundColor: COLORS.mainBackground, borderRadius: 20, marginBottom: 10}}>
                                    <QR
                                        value={'fdskfkasjdgkjs'}
                                        size={180}
                                        color="black"
                                        backgroundColor={COLORS.mainBackground}
                                    />
                                </View>
                                <CountdownTimer 
                                    targetDate={ ( 15 * 60 * 1000 ) + (new Date().getTime()) }
                                    handleFinish={() => dispatch(setShowTimeEndAlert())}
                                    styleBox={{backgroundColor: 'transparent'}}
                                    styleSeparator={{
                                        marginHorizontal: 0,
                                        color: COLORS.black,
                                        marginBottom: 2 
                                    }}
                                />
                            </>
                        }
                    {/* ---- end - QR Code Section */}    
            
                    {/* ---- start - Bottom Section */}
                    <View style={{width: '100%', paddingHorizontal: 5}}>
                        
                        

                    </View>
                    {/* ---- end - Bottom Section */}

                </View>

                {/* ------------------------------------------------- */}
                {/* Info Area */}
                {/* ------------------------------------------------- */}
                {/* ---- Information Section */}
                    {/* Title */}
                    <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Informationen</Text>
                    {/* Info */}
                    <Text style={T2}>Dieser Coupon wird von <Text style={{fontFamily: 'RH-Bold'}}>Yoko Sushi Bremen</Text> bereitgestellt!</Text>
                {/* ---- Adress Section */}
                    {/* Title */}
                    <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Standort</Text>
                    {/* Info Container */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/* Address */}
                        <Text style={T2}>Bahnhofsplatz 42 {"\n"}22195 Bremen</Text>
                        {/* Map Button */}
                        <TouchableOpacity style={styles.buttonStyle} onPress={handleOpenMap}>
                            <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Karte öffnen</Text>
                        </TouchableOpacity>
                    </View>

                {/* ---- Condition Section */}
                    {/* Title */}
                    <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 20, marginBottom: 8}]}>Konditionen</Text>
                    {/* Info */}
                    <BulletPointText text={'Kann nicht ausgezahlt werden.'}/>
                    <BulletPointText text={'Nur einlösbar solange das Artikel verfügbar ist.'}/>
                    <BulletPointText text={'Vom Umtausch und Rückgabe ausgeschlossen!'}/>
                    {/* Condition Text */}
                    <Text style={[T2, {marginTop: 20}]}>Informiere dich bitte vorher über die <Text style={{fontFamily: 'RH-Medium', color: COLORS.primary}}>Teilnahmebedingungen</Text>.</Text>

        </View>
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
        backgroundColor: COLORS.mainBackground,
        justifyContent: 'center'
    },

    logoBox: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden'
    },

    qrCodeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        // height: width,
        width: width-60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 20,
        alignSelf: 'center',
    },

    navHeaderBackground: {
        width: width,
        height: 110,
        position: 'absolute',
        justifyContent: 'flex-end',
        top: 0,
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