import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, set, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'

import { H3, H4 } from '../../constants/text-style'
import { setHideFilterModal, setHideSettingShowMoreModal, setShowLocateModal } from '../../redux/slices/showModalSlice'
import LocateButton from '../components_locate_screen/LocateButton'



export default function ShowMoreOfferModal() {

    const dispatch = useDispatch()

// ----------------------------  
// Modal Setting 
// ---------------------------- 

    // Animation -----------------------------------------------------------------------------------------------------------
    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showSettingShowMoreModal = useSelector((state) => state.showModal.settingShowMoreModal)

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        setTimeout(() => {
            dispatch(setHideSettingShowMoreModal())
        }, 50) 
    }

    const handleClose = () => {
        dispatch(setHideSettingShowMoreModal())
    } 

    // handle Gesture -------------------------------------------------
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, 0.05*height)
    })
    .onEnd(() => {
        if (translateY.value > 0.2*height) {
            translateY.value = withTiming(height, {duration: 600, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
            runOnJS(handleOnEnd)()
        }
        else {
            translateY.value = withTiming(0.05*height, {duration: 400,
              easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
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
        if (showSettingShowMoreModal) {
            translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } else {
            translateY.value = withDelay(100, withTiming(height, {duration: 400}))
        }
    }, [showSettingShowMoreModal])

    const handleLocateSearchScreen = () => {
        dispatch(setHideFilterModal())
        dispatch(setShowLocateModal())
    }



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}

            <View style={{width: width, marginTop: 6, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center'}}>
                <LocateButton small onPressSmall={handleLocateSearchScreen}/>
                <View style={{flexDirection: 'row'}}>
                    <RoundButton 
                        icon={icons.MaterialIcons}
                        iconName={'undo'}
                        iconSize={22}
                        iconColor={COLORS.grey}
                        style={{
                            backgroundColor: COLORS.ivoryDark,
                            height: moderateScale(34,0.2),
                            width: moderateScale(34,0.2),
                            margin: 0,
                            marginRight: 10, 
                            borderRadius: 8,
                        }}
                        // onPressButton={handleReset}
                    />

                    <RoundButton 
                        icon={icons.MaterialIcons}
                        iconName={'close'}
                        iconSize={moderateScale(22,0.2)}
                        iconColor={COLORS.white}
                        style={{
                            backgroundColor: COLORS.grey,
                            height: moderateScale(34,0.2),
                            width: moderateScale(34,0.2),
                            margin: 0,
                        }}
                        // onPressButton={handleClose}
                    />

                </View>
            </View>

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Filtereinstellungen</Text>
            </View>


        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 0.6*height,
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

    h3: {
        fontFamily: 'RH-Light',
        fontSize: 24,
      },
  
    topSectionContainer: {
      width: width,
      marginTop: 10,
      paddingHorizontal: 30,
      justifyContent: 'flex-end',
      backgroundColor: COLORS.white,
      paddingBottom: 20
    },
  
    midSectionContainer: {
      height: (0.44*height),
      width: width,
      paddingHorizontal: 25,
      overflow: 'hidden',
    // backgroundColor: 'yellow'
    },

    line2: {
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
        marginTop: 15,
        marginBottom: 15
      },
  
  
  })