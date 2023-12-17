import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// Animation
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHideQueueModal, setHideQueueOverviewModal } from '../../../redux/slices/showModalSlice'
// Constant
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { H1, H2, H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import BigButton from '../../components_LogIn/BigButton'
import { useNavigation } from '@react-navigation/native'
import { setJoinedQueue, setShowQueueAlert } from '../../../redux/slices/queueSlice'

// QR
import  {default as QR} from 'react-native-qrcode-svg';
import QueueAlert from './QueueAlert'
import ScreenOverlay from '../../components_universal/ScreenOverlay'


export default function QueueOverviewModal() {

    // Redux
    const dispatch = useDispatch()
    const showQueueOverviewModal = useSelector((state) => state.showModal.queueOverviewModal)

    // Animation -----------------------------------------------------------------------------------------------------------
    const navigation = useNavigation()


    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const handleClose = () => {
        dispatch(setHideQueueOverviewModal())
    } 

    // Handle Leave Button
    const handleLeaveButton = () => {
        dispatch(setShowQueueAlert())
    }

    // handle Gesture -------------------------------------------------
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, 0)
    })
    .onEnd(() => {
        if (translateY.value > 0.2*height) {
            runOnJS(handleClose)()
        }
        else {
            translateY.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
        }
    })

    // handle Animation ------------------------------------------------

      // position Update
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translateY.value }]
        }
      })

      // check status
      useEffect(()=>{
        if (showQueueOverviewModal) {
            translateY.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } 
        else {
            translateY.value = withTiming(height, {duration: 350,easing: Easing.bezier(0.25, 0.1, 0.25, 1),})
        }
      }, [showQueueOverviewModal])


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
    <QueueAlert />
    <ScreenOverlay queueAlert delay={200} cardStyle={{zIndex: 6}}/>
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}
            <RoundButton
                icon={icons.MaterialIcons}
                iconName={'close'}
                iconSize={moderateScale(28,0.2)}
                iconColor={COLORS.mainBackground}
                style={{
                    backgroundColor: COLORS.grey,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    margin: 0,
                    position: 'absolute',
                    top: 60,
                    left: 30,
                    zIndex: 2,
                }}
                onPressButton={handleClose}
            />

            {/* -------------------------------------------------------------------- Main Content */}
            <View style={{ alignItems: 'center', justifyContent:'center', height: height, width, width, paddingBottom: 80}}>

                {/* Header */}
                <Text style={[H1, {textAlign: 'center'}]}>Danke für's warten!</Text>
                {/* SubHeader */}
                <Text style={[T1, {marginTop: 20}]}>Du bist aktuell auf Position:</Text>
                {/* Current Number Section */}
                <View style={{flexDirection: 'row', marginVertical: 30}}>
                    {/* Store Logo */}
                    <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, marginRight: 15}}>
                        <Image 
                            source={require('../../../../assets/image/datbackhus.png')}
                            resizeMode='contain'
                            style={{
                                maxWidth: '80%',
                            }}
                        />  
                    </View>
                    {/* Current Number */}
                    <View style={styles.number}>
                        <Text style={[H2, {fontSize: 68}]}>15</Text>
                    </View>
                </View>
                {/* Time */}
                <Text style={[T1]}>Geschätzte Wartezeit: <Text style={{fontFamily: 'RH-Bold', color: COLORS.primary}}>10 min.</Text></Text>
                {/* QR Section  */}
                <View style={styles.qrCodeContainer}>
                    <QR
                        value={'12343254425'}
                        size={160}
                        color={COLORS.black}
                        backgroundColor={COLORS.mainBackground}
                    />
                </View>

            </View>

            {/* Leave Queue Button */}
            <BigButton
                title={'Warteschlage verlassen'}
                bgStyle={{
                    backgroundColor: COLORS.ivoryDark,
                    position: 'absolute',
                    zIndex: 2,
                    bottom: 30,
                }}
                titleStyle={{
                    color: COLORS.grey
                }}
                onPress={handleLeaveButton}
            />
            

        </Animated.View>
    </GestureDetector>
    </>
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: height,
        width: width,
        position: 'absolute',
        zIndex: 5,
        backgroundColor: COLORS.mainBackground,
        bottom: 0,
        borderRadius: 20,
        // justifyContent: 'center',
        // alignItems: 'center',

        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
    },
  
    line:{
      width: 75,
      height: 4,
      backgroundColor: COLORS.ivoryDark,
      alignSelf: 'center',
      marginTop: 15,
      borderRadius: 2,
      zIndex: 2
    },
    
    number: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
  
    qrCodeContainer: {
        height: 180,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
  })