import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useRef } from 'react'

// Reanimated
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

// Constants
import { COLORS } from '../../../index/constantsindex'
import { H1, H2, H4, T1, T2, T3 } from '../../../constants/text-style'
import { height, width } from '../../../constants/size'

// Components
import Icons, { icons } from '../../../components/components_universal/Icons'
import PointIcon from '../../../components/components_universal/PointIcon'
import BigButton from '../../../components/components_LogIn/BigButton'
import IconLabelButton from '../../../components/components_universal/IconLabelButton'
import PresentationHeader from '../../../components/components_universal/PresentationHeader'
import NewOfferBox from '../../../components/components_discover_screen/NewOfferBox'
import StoreNav from '../../../navigation/navigationComponents/StoreNav'
import QuestFeed from '../../../components/components_stores_screen/QuestFeed'
import RoundButton from '../../../components/components_universal/RoundButton'
import AnimatedText from '../../../components/components_universal/pointCounter/AnimatedText'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { decreasePoint, increasePoint, setPoint } from '../../../redux/slices/pointSlice'

// -------------------------------------- Global Value 
const storeImgHeaderHeight = 0.35 * height

// ---------------------------------------------------------------------------------------------------------------------
export default function StoreEntry({
    navigation, 
    navigation: {goBack},
}) {
    // Redux
    const dispatch = useDispatch()

    // ---------------------------------- Sticky Header
    // Value Section
    const scrollRef = useRef()
    const scrollDistance = useSharedValue(0)
    // Header Image Animation
    const animateHeaderImage = useAnimatedStyle(() => {
        return {
            height: interpolate( scrollDistance.value <= storeImgHeaderHeight? scrollDistance.value : storeImgHeaderHeight, [0, storeImgHeaderHeight], [storeImgHeaderHeight, 0 ] ),
            opacity: interpolate( scrollDistance.value <= storeImgHeaderHeight? scrollDistance.value : storeImgHeaderHeight, [0, storeImgHeaderHeight/2], [1, 0 ] ),
        }
    })
    // Nav Header Animation
    const animateNavHeader = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: scrollDistance.value <= storeImgHeaderHeight/2 && scrollDistance.value >= 0? interpolate(scrollDistance.value, [0,storeImgHeaderHeight/2], [0,-10]) : scrollDistance.value <= 0? 0 : -10}
            ]
        }
    })
    // Nav Background Animation
    const animateNavBackground = useAnimatedStyle(() => {
        return {
            opacity: scrollDistance.value <= storeImgHeaderHeight*0.8 && scrollDistance.value >= storeImgHeaderHeight*0.5 ? interpolate(scrollDistance.value, [storeImgHeaderHeight*0.5, storeImgHeaderHeight*0.8], [0,1]) : scrollDistance.value <= storeImgHeaderHeight*0.5 ? 0 : 1,
            transform: [
                {translateY: scrollDistance.value <= storeImgHeaderHeight/2 && scrollDistance.value >= 0? interpolate(scrollDistance.value, [0,storeImgHeaderHeight/2], [0,-10]) : scrollDistance.value <= 0? 0 : -10}
            ]
        }
    })
    // Store Name Animation
    const animateStoreName = useAnimatedStyle(() => {
        return {
            opacity: scrollDistance.value > storeImgHeaderHeight*0.8 ? interpolate(scrollDistance.value, [storeImgHeaderHeight*0.8, storeImgHeaderHeight], [0,1]) : 0,
        }
    })

    // ---------------------------------- User Point
    // Value Section
    const point = useSelector((state) => state.point.point)
    // Set User Point 
    useEffect(() => {
        // Thanh - lay Store Point nhet vao day 
        dispatch(setPoint(1270))
    }, [])

// ---------------------------------------------------------------------------------------------------------------------
// MAIN 
// ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white, overflow: 'hidden'}}>

        {/* ----------------------------- Nav Header */}
        <Animated.View style={[{position: 'absolute', zIndex: 3, width: width}, animateNavHeader]}>
            {/* Nav Bar  */}
            <StoreNav 
                qrButton
                goBack
                onPressGoBack={() => goBack()}
                quickSelection
                onPressQRButton={() => navigation.navigate('QRScan')}
                animationValue={scrollDistance}
                headerHeight={storeImgHeaderHeight}
            />
        </Animated.View>

        {/* ----------------------------- Header Image */}
        <Animated.View style={[styles.headerImgContainer, animateHeaderImage]}>
            <Image 
                source={require('../../../../assets/image/test.jpg')}
                resizeMode='cover'
                style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                }}
            />
        </Animated.View>

        {/* ----------------------------- Nav Background */}
        <Animated.View style={[styles.navHeaderBackground, animateNavBackground]}>
            {/* Store Name */}
            <Animated.Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}, animateStoreName]}>Dat Backhus</Animated.Text>
        </Animated.View>

        {/* ----------------------------- Scroll View */}
        <ScrollView
            ref={scrollRef}
            scrollEventThrottle={16}
            onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y <= (e.nativeEvent.contentSize.height - height)) {
                    scrollDistance.value = e.nativeEvent.contentOffset.y
                } 

                // console.log(e.nativeEvent.contentSize.height-height)
                // console.log(scrollDistance.value)
                // console.log(height)
            }}
        >

        {/* ----------------------------- Main Section */}
        <View style={styles.contentSection}>
 
            {/* --------- Header Section */}
            <View style={{marginHorizontal: 30, marginTop: 30}}>
                {/* Store Name */}
                <Text style={H1}>Dat Backhus</Text>
                {/* Address */}
                <Text style={T2}>Bahnhofsplatz 42, 22195 Bremen</Text>
                {/* Follower */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <Icons 
                        icon={icons.MaterialIcons}
                        iconName={'favorite'}
                        iconSize={16}
                        iconColor={COLORS.primary}
                    />
                    <Text style={[T2, {marginLeft: 5}]}>20</Text>
                </View>
                {/* Description */}
                <Text style={[T1, {marginTop: 20}]}>Frische handgemachte Brötchen, Kuchen und Gebäcke.</Text>
                {/* Opening hours */}
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {/* Left Section */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icons 
                            icon={icons.Ionicons}
                            iconName={'ios-time'}
                            iconSize={16}
                            iconColor={COLORS.grey}
                        />
                        <Text style={[T2, {marginLeft: 5}]}>10:00 - 20:00</Text>
                    </View>
                    {/* Right Section */}
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Mehr Informationen</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --------- Point Section */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30}}>
                {/* Left Section */}
                <View>
                    {/* Label */}
                    <Text style={[T3, {color: COLORS.grey}]}>Meine Punkte</Text>
                    {/* Points */}
                    <View style={{flexDirection: 'row'}}>
                        {/* <Text style={[H2, {color: COLORS.grey, marginRight: 5}]}>500</Text> */}
                        <PointIcon style={{marginTop: 18, marginRight: 5}}/>
                        <AnimatedText num={point} duration={1000}/>
                    </View>
                </View>
                {/* Right Section */}
                <View style={{flexDirection: 'row'}}>
                    {/* Coupons Overview Button  */}
                    <RoundButton
                        icon={icons.MaterialCommunityIcons}
                        iconName={'ticket-percent'}
                        iconSize={20}
                        iconColor={COLORS.grey}
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 16,
                            alignSelf: 'flex-end',
                            margin: 0,
                            backgroundColor: COLORS.ivoryDark,
                        }}
                        onPressButton={() => navigation.navigate('CouponsOverview')}
                    />
                    {/* Award Overview Button  */}
                    <IconLabelButton
                        label={'Prämienliste'}
                        icon={icons.MaterialCommunityIcons}
                        iconName={'gift'}
                        iconSize={19}
                        iconColor={COLORS.grey}
                        style={{
                            backgroundColor: COLORS.ivoryDark,
                            height: 50,
                            paddingHorizontal: 15,
                            borderRadius: 16,
                            alignSelf: 'flex-end',
                            marginLeft: 10,
                        }}
                        labelStyle={{
                            marginLeft: 2,
                            color: COLORS.grey,
                            fontFamily: 'RH-Medium'
                        }}
                        innerContainerStyle={{
                            alignItems: 'baseline'
                        }}
                        onPressButton={() => navigation.navigate('AwardOverview')}
                    />
                </View>
            </View>

            {/* --------- Challenge Section */}
            <View style={{marginTop: 20}}>
                {/* Header */}
                <PresentationHeader
                    title={'Herausforderungen'}
                    showAllButton
                />
                {/* Quests */}
                <View style={{marginHorizontal: 30}}>
                    <QuestFeed />
                    <QuestFeed />
                    <QuestFeed />
                </View>
            </View>

            {/* --------- New Offers Section */}
            <View style={{marginTop: 20}}>
                {/* Header */}
                <PresentationHeader
                    title={'Aktuelle Angebote'}
                    
                />
                {/* New Offers */}
                <View style={{marginHorizontal: 30}}>
                    <NewOfferBox />
                </View>
            </View>

            {/* --------- Feedback Section */}
            <IconLabelButton
                    label={'Feedback und Anregungen'}
                    icon={icons.MaterialCommunityIcons}
                    iconName={'email'}
                    iconSize={24}
                    iconColor={COLORS.grey}
                    style={{
                        backgroundColor: COLORS.ivoryDark,
                        height: 50,
                        marginHorizontal: 30,
                        borderRadius: 16,
                        marginTop: 50,
                        marginBottom: 95,
                        width: width-60, 
                        justifyContent: 'center'
                    }}
                    labelStyle={{
                        marginLeft: 5,
                        color: COLORS.grey,
                        fontFamily: 'RH-Medium'
                    }}
                    onPressButton={() => navigation.navigate('SendFeedback')}
                />

        </View>
        </ScrollView>

        {/* ----------------------------- Join Queue Button */}
        <BigButton 
            title={'Warteschlage beitreten'}
            bgStyle={{
                backgroundColor: COLORS.primary,
                position: 'absolute',
                zIndex: 2,
                bottom: 30,
            }}
            titleStyle={{
                color: COLORS.white
            }}
            onPress={() => console.log('join queue')}
        />  
        
        {/* Test Store Point Buttons */}
        <View style={{flexDirection: 'row', paddingHorizontal: 30, position: 'absolute', bottom: 100}}>
        <Button title='increase' onPress={() => dispatch(increasePoint(100))}/>
        <Button title='decrease' onPress={() => dispatch(decreasePoint(200))}/>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    headerImgContainer: {
        height: storeImgHeaderHeight,
        width: width,
        backgroundColor: COLORS.mainBackground,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 2,
    },

    contentSection: {
        width: width,
        paddingTop: storeImgHeaderHeight,
    },

    box: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: COLORS.grey,
        marginLeft: 2,
        color: COLORS.white,
        alignSelf: 'baseline',
        marginTop: 5,
    },

    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 30,
        right: 30,
    },

    navHeaderBackground: {
        width: width,
        height: 110,
        position: 'absolute',
        backgroundColor: COLORS.white,
        zIndex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 19,
        paddingLeft: 0.2*width,
    
        shadowColor:"#686868",
        shadowOffset: {
           width: 0,
           height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 0
    }
})

