import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'

import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { H3, H4 } from '../../../../helper/constants/text'
import { height, width } from '../../../../helper/constants/size'
import { COLORS } from '../../../../helper/constants/colors'
// Wheel Picker
import WheelPicker from 'react-native-wheely';



export default function ValidityPeriodPickerModal() {
  // Animation -----------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    const [selectedIndex, setSelectedIndex] = useState(0);

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showActivityHistoryModal = true

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        setTimeout(() => {
            // dispatch(setHideActivityHistoryModal())
        }, 50) 
    }

    const handleClose = () => {
        // dispatch(setHideActivityHistoryModal())
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
                    {/* <RoundButton 
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
                /> */}

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>
                <WheelPicker
                    selectedIndex={selectedIndex}
                    options={['1 Monat', '2 Monate', '3 Monate', '4 Monate', '5 Monate', '6 Monate']}
                    onChange={(index) => setSelectedIndex(index)}
                    selectedIndicatorStyle={{backgroundColor: COLORS.mainBackground, borderRadius: 0}}
                    itemTextStyle={{fontFamily: 'RH-Regular', fontSize: 18}}
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
    //   paddingHorizontal: 30,
      overflow: 'hidden',
    // backgroundColor: 'yellow'
    },
  
  
  })