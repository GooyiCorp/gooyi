import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, Image } from 'react-native'
import React, { useEffect } from 'react'
// QR
import  {default as QR} from 'react-native-qrcode-svg';
// Animation
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHideQueueModal } from '../../../redux/slices/showModalSlice'
// Constant
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import { icons } from '../../components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { H1, H2, H3, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import BigButton from '../../components_LogIn/BigButton'


export default function QueueModal() {

    const userID = Math.random().toString()

  // Animation -----------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showQueueModal = useSelector((state) => state.showModal.queueModal)

    // handle Close ---------------------------------------------------
    const handleClose = () => {
        dispatch(setHideQueueModal())
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
        if (showQueueModal) {
            translateY.value = withTiming(0, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } 
        else {
            translateY.value = withTiming(height, {duration: 400,easing: Easing.bezier(0.25, 0.1, 0.25, 1),})
        }
      }, [showQueueModal])


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
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
                iconColor={COLORS.white}
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


            {/* -------------------------------------------------------------------- Content Section */}
            <View style={styles.midSectionContainer}>
                {/* Logo Section */}
                <View style={{width: width, height: 0.25*height, justifyContent: 'center', paddingTop: 100, alignItems: 'center',}}>
                    <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Image 
                            source={require('../../../../assets/image/datbackhus.png')}
                            resizeMode='contain'
                            style={{
                                maxWidth: '100%',
                            }}
                        />  
                    </View>
                </View>
                {/* Queue Position Section  */}
                <View style={{width: width, height: 0.35*height, alignItems: 'center', padding: 30, justifyContent:'center'}}>
                    <Text style={H1}>Du bist eingetragen!</Text>
                    <Text style={[T1, {marginTop: 20}]}>Deine Position in der Warteschlage ist</Text>
                    <View style={styles.positionCircle}>
                        <Text style={[H2, {fontSize: 68}]}>15</Text>
                    </View>
                    <Text style={[T1]}>Geschätzte Wartezeit: <Text style={{fontFamily: 'RH-Bold', color: COLORS.primary}}>10 min.</Text></Text>
                    {/* <Text style={[T2, {marginTop: 20, textAlign: 'center'}]}>Bitte achte darauf, dass du dich nicht{"\n"}zu weit weg vom Laden entfernst!</Text> */}
                </View>
                {/* QR Section */}
                <View style={{width: width, height: 0.40*height, alignItems: 'center', paddingBottom: 130, justifyContent: 'center'}}>
                    <QR
                        value={userID}
                        size={160}
                        color={COLORS.black}
                        backgroundColor={COLORS.white}
                    />
                </View>

                <BigButton
                    title={'Warteschlage verlassen'}
                    bgStyle={{
                        backgroundColor: COLORS.primary,
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 30,
                    }}
                    titleStyle={{
                        color: COLORS.white
                    }}
                />
            </View>

        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: height,
        width: width,
        position: 'absolute',
        zIndex: 5,
        backgroundColor: COLORS.white,
        bottom: 0,
        borderRadius: 20,

        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
    },
  
    line:{
      width: 75,
      height: 4,
      backgroundColor: COLORS.default,
      alignSelf: 'center',
      marginTop: 15,
      borderRadius: 2
    },

    line2: {
        width: width,
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
        margin: 20,
    },
  
    midSectionContainer: {
        position: 'absolute',
        height: height,
        width: width,
        alignItems: 'center',
    },

    positionCircle: {
        width: 0.35*width,
        height: 0.35*width,
        // backgroundColor: COLORS.ivoryDark,
        borderRadius: width,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    qrCodeContainer: {
        height: 200,
        width: 200,
        // backgroundColor: COLORS.mainBackground,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: COLORS.borderGrey,
        // borderWidth: 0.5
      },
  
  })