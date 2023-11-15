import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setHideLocateModal } from '../../redux/slices/showModalSlice'
import { H3, T1, T2, T3, T4 } from '../../constants/text-style'
import LocateSelectionButton from './LocateSelectionButton'
import { setSelected, setUnselected } from '../../redux/slices/locateSlice'


export default function LocateModal() {

  // Thanh API
  const currentPosition = 'Bahnhofsplatz 42, 28195 Bremen'

  // Animation -----------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    const selected = useSelector((state) => state.locate.selected)

    const locateButtonList = [
      {id: 1, label: 'Position ermitteln', icon: icons.Ionicons, iconName: 'ios-navigate', iconSize: 25},
      {id: 2, label: 'Standort auswählen', icon: icons.MaterialIcons, iconName: 'add', iconSize: 32},
      {id: 3, label: 'Stadt aussuchen', icon: icons.MaterialIcons, iconName: 'location-city', iconSize: 30},
    ]

    const handlePress = (row) => {
      if (selected == row.id) {
        dispatch(setUnselected())
      } else {
        dispatch(setSelected(row.id))
      }
      // Thanh - lam gi tiep 
    }

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showLocateModal = useSelector((state) => state.showModal.locateModal)

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        setTimeout(() => {
            dispatch(setHideLocateModal())
        }, 50) 
    }

    const handleClose = () => {
        dispatch(setHideLocateModal())
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
        if (showLocateModal) {
            translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } else {
            translateY.value = withDelay(100, withTiming(height, {duration: 400}))
        }
      }, [showLocateModal])


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
                    iconSize={moderateScale(22,0.2)}
                    iconColor={COLORS.white}
                    style={{
                        backgroundColor: COLORS.grey,
                        height: moderateScale(34,0.2),
                        width: moderateScale(34,0.2),
                        position: 'absolute',
                        margin: 0,
                        top: 25,
                        right: 25,
                        zIndex: 2
                    }}
                    onPressButton={handleClose}
                />

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={H3}>Standort Auswahl</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>
              <View style={styles.currentPositionFeed}>
                  <Text style={[T3, {color: COLORS.grey}]}>Aktuelle Position</Text>
                  <Text style={[T1, {marginTop: 5, fontFamily: 'RH-Medium'}]}>{currentPosition}</Text>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.buttonView}>
                {locateButtonList.map((list) => 
                  <LocateSelectionButton 
                    key={list.id}
                    label={list.label}
                    icon={list.icon}
                    iconName={list.iconName}
                    iconSize={list.iconSize}
                    iconColor={list.id === selected? COLORS.white : COLORS.grey}
                    bgStyle={{backgroundColor: list.id === selected? COLORS.grey : COLORS.default}}
                    labelStyle={{fontFamily: list.id === selected? 'RH-Medium' : 'RH-Regular', color: list.id === selected? COLORS.black : COLORS.grey}}
                    onPress={() => handlePress(list)}
                  />
                )}
              </View>
            </View>

        </Animated.View>

    </GestureDetector>

  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 0.5*height,
        width: width,
        position: 'absolute',
        zIndex: 5,
        backgroundColor: COLORS.white,
        bottom: 0,
        borderRadius: 20,

        shadowColor:"#686868",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 0
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
      height: 0.3*height,
      width: width,
      paddingHorizontal: 30,
      overflow: 'hidden',
      // backgroundColor: 'yellow'
    },
  
    currentPositionFeed: {
      // height: 60,
      width: '100%',
      // backgroundColor: 'yellow'
    },
    line2: {
      borderWidth: 0.5,
      borderColor: COLORS.borderGrey,
      marginTop: 15,
      marginBottom: 25
    },

    buttonView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
  })