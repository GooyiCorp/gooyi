import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import { moderateScale } from '../../helper/scale'
import RoundButton from '../components_universal/RoundButton'
import { icons } from '../components_universal/Icons'


export default function ErrorModal({
    onClose
}) {
  // Animation -----------------------------------------------------------------------------------------------------------

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const closeButton = () => {
        translateY.value = withDelay(100, withTiming(height, {duration: 400}))
        onClose()
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
            translateY.value = withTiming(height, {duration: 400, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
            runOnJS(onClose)()
        }
        else {
            translateY.value = withTiming(0.05*height, {duration: 400,
              easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
        }
    })

    // handle Animation ------------------------------------------------

    const bgStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translateY.value,[height,0.05*height], [0, 1])
        return {
          opacity: opacity
        }
      })

      // position Update
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translateY.value }]
        }
      })

      // start Animation
      useEffect(()=>{
        translateY.value = withTiming(0.4*height, {duration: 500,
        easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
      }, [])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bgContainer, bgStyle]}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <Pressable style={{height: height, width: width}} onPressIn={() => Keyboard.dismiss()}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}
            <View style={styles.closeButtonContainer}>
                    <RoundButton 
                    icon={icons.MaterialIcons}
                    iconName={'close'}
                    iconSize={moderateScale(22,0.2)}
                    iconColor={COLORS.white}
                    style={{
                        backgroundColor: COLORS.grey,
                        height: moderateScale(34,0.2),
                        width: moderateScale(34,0.2),
                    }}
                    onPressButton={closeButton}
                />
            </View>

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={styles.titleDefaultStyle}>Suchen</Text>
                    {/* <View style={{width: width-60, height: 1, backgroundColor: COLORS.subPrimary02}}></View> */}
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>
              


            </View>
            
            </Pressable>
            </Animated.View>

        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

  modalContainer: {
      height: height,
      width: width,
      position: 'absolute',
      zIndex: 2,
      backgroundColor: COLORS.white,
      bottom: 0,
      borderRadius: 20,
  },

  searchContainer: {
    width: width-60,
    height: 50,
    backgroundColor: COLORS.default,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  bgContainer: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.bgTransparencyDark,
    zIndex: 3,
    position: 'absolute'
  },

  line:{
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 2
  },

  closeButtonContainer: {
    width: width,
    //backgroundColor: 'yellow',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },

  topSectionContainer: {
    width: width,
    // backgroundColor: 'yellow',
    paddingHorizontal: 30,
    justifyContent: 'flex-end'
  },

  titleDefaultStyle: {
    fontFamily: 'Roboto-Medium', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
  },

  midSectionContainer: {
    height: (0.4*height)/2,
    width: width,
    //backgroundColor: COLORS.subPrimary02,
    //marginHorizontal: 30,
    paddingHorizontal: 30,
  },


})