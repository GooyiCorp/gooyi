import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
// Reanimated
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
// Gesture Handler
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'
// Helpers
import { height, width } from '../../../../helper/constants/size'
import { COLORS } from '../../../../helper/constants/colors'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHideValidityTimePicker, setValidityTime } from '../../../../redux/slices/createCouponSlice'
// Wheel Picker
import WheelPicker from 'react-native-wheely';
// Constants
import IconButton from '../../../universal/Buttons/IconButton'
import { icons } from '../../../universal/Icons/Icons'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ValidityPeriodPickerModal() {

  // Redux
  const dispatch = useDispatch()

  const pickerList = ['1 Monat', '2 Monate', '3 Monate', '4 Monate', '5 Monate', '6 Monate']
  const [selectedIndex, setSelectedIndex] = useState(0);
  const showValidityTimePicker = useSelector(state => state.createCoupon.validityTimePicker)
   
  // ----------------------------  
  // Animation Section
  // ---------------------------- 
    // ---- Value
    const translateY = useSharedValue(0.8*height)
    const context = useSharedValue({y: 0})
    const bgViewTransition = useSharedValue(0)

    // ---- start - Close Handle 
    const handleOnEnd = () => {
      setTimeout(() => {
        dispatch(setHideValidityTimePicker())
      }, 50) 
    }
    const handleClose = () => {
      dispatch(setHideValidityTimePicker())
    }
    // ---- end - Close Handle 

    // ---- start - handle Gesture Section
    const gesture = Gesture.Pan()
      // OnStart
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      // OnUpdate
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, 0.05*height)
      })
      // OnEnd
      .onEnd(() => {
        if (translateY.value > 0.2*height) {
            translateY.value = withTiming(0.6*height, {duration: 600, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
            runOnJS(handleOnEnd)()
        }
        else {
            translateY.value = withTiming(0.05*height, {duration: 400,
              easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
        }
      })
    // ---- start - handle Gesture Section

    // ---- start - Animated Style    
      // BG View Style
      const translateBGView = useAnimatedStyle(() => {
        return {
            opacity: bgViewTransition.value,
        }
      })
      // position Update
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translateY.value }]
        }
      })
    // ---- end - Animated Style
    
    // ---- start - check status Section
    useEffect(() => {
      if (showValidityTimePicker) {
        bgViewTransition.value = withTiming(1)
        translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
      } else {
        bgViewTransition.value = withTiming(0)
        translateY.value = withDelay(100, withTiming(0.6*height, {duration: 400}))
      }
    }, [showValidityTimePicker])
    // ---- end - check status Section


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<>
  {/* ---- start - BG View */}
  <Animated.View style={[{height: height, width: width, position: 'absolute', zIndex: showValidityTimePicker ? 5 : 0}, translateBGView]}> 
    <Pressable 
        style={{height: height, width: width, backgroundColor: COLORS.bgTransparencyDark}}
        onPress={handleClose}
    ></Pressable>
  </Animated.View>
  {/* ---- end - BG View */}

  {/* ---- start - Modal Section */}
  <GestureDetector gesture={gesture}>
    {/* ---- Modal Container */}
    <Animated.View style={[styles.modalContainer, animatedStyle]}>
      {/* Top Line */}
      <View style={styles.line}></View>
      {/* Close Button  */}
      <IconButton 
        icon={icons.MaterialIcons} iconName={'close'} iconSize={22} iconColor={COLORS.white}
        styleContainer={{
            backgroundColor: COLORS.grey,
            height: 34,
            width: 34,
            position: 'absolute',
            margin: 0,
            top: 25,
            right: 25,
            zIndex: 2
        }}
        onPress={handleClose}
      />

      {/* ---- start - Top Section */}
      <View style={styles.topSectionContainer}></View>
      {/* ---- end - Top Section */}

      {/* ---- start - Mid Section */}
      <View style={styles.midSectionContainer}>
        {/* React Native Wheely */}
        <WheelPicker
          selectedIndex={selectedIndex}
          options={pickerList}
          onChange={(index) => {setSelectedIndex(index), dispatch(setValidityTime(pickerList[index])) }}
          selectedIndicatorStyle={{backgroundColor: COLORS.mainBackground, borderRadius: 0}}
          itemTextStyle={{fontFamily: 'RH-Regular', fontSize: 18}}
        />
      </View>
      {/* ---- end - Mid Section */}

    </Animated.View>
  </GestureDetector>
  {/* ---- end - Modal Section */}
</>
)
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  modalContainer: {
    height: 0.4*height,
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

  topSectionContainer: {
    width: width,
    marginTop: 10,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.white,
    paddingBottom: 20
  },

  midSectionContainer: {
    height: (0.3*height),
    width: width,
    overflow: 'hidden',
  },

})