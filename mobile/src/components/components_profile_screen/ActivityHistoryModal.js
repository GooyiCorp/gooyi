import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setHideActivityHistoryModal } from '../../redux/slices/showModalSlice'
import ActivityHistoryFeed from './ActivityHistoryFeed'
import { H3 } from '../../constants/text-style'


export default function ActivityHistoryModal() {
  // Animation -----------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showActivityHistoryModal = useSelector((state) => state.showModal.activityHistoryModal)

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        setTimeout(() => {
            dispatch(setHideActivityHistoryModal())
        }, 50) 
    }

    const handleClose = () => {
        dispatch(setHideActivityHistoryModal())
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
        if (showActivityHistoryModal) {
            translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } else {
            translateY.value = withDelay(100, withTiming(height, {duration: 400}))
        }
      }, [showActivityHistoryModal])


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
                    <Text style={H3}>Letzte Aktivitäten</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>
                <ActivityHistoryFeed 
                    storeName={'Yoko Sushi Bremen'}
                    time={'vor 3 min'}
                    progress={'5/6'}
                    reward={'+1'}
                />
                <ActivityHistoryFeed 
                    storeName={'Yoko Sushi Bremen'}
                    time={'vor 4 d'}
                    progress={'4/6'}
                    reward={'+3'}
                />
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
        zIndex: 2,
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
      paddingHorizontal: 30,
      overflow: 'hidden',
    // backgroundColor: 'yellow'
    },
  
  
  })