import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'
import RoundButton from './RoundButton'
import { icons } from '../atoms/Icons'
import { moderateScale } from '../../helper/scale'


export default function SearchModal({
    onClose
}) {
  // Animation -----------------------------------------------------------------------------------------------------------

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const closeButton = () => {
        translateY.value = withTiming(height, {duration: 300})
        onClose()
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
            translateY.value = withSpring(height, { damping: 15 })
            runOnJS(onClose)()
        }
        else {
            translateY.value = withSpring(0, { damping: 15 })
        }
    })

    // handle Animation ------------------------------------------------

    const bgStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translateY.value,[height,0], [0, 1])
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
          translateY.value = withTiming(0, {duration: 400,
            easing: Easing.bezier(0.49, 1.19, 0.79, 1.02),})
        }, [])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bgContainer, bgStyle]}>
        
        {/* Modal Container ---------------------------------------------------- */}
        <Animated.View style={[styles.modalContainer, animatedStyle]}>

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



        </Animated.View>

      </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

  modalContainer: {
      height: 0.95*height,
      width: width,
      position: 'absolute',
      zIndex: 2,
      backgroundColor: COLORS.white,
      bottom: 0,
      borderRadius: 20,
  },

  searchContainer: {
    width: width-150,
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    justifyContent: 'center',
  },

  justifyView: {
    width: width,
    height: 60,
    flexDirection: 'row',
    marginTop: 100, 
    paddingHorizontal: 30, 
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  bgContainer: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
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


})



{/* < style={styles.modalContainer}>
        <TouchableOpacity style={{position: 'absolute', height: height, width: width, zIndex: 0}} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <View style={styles.justifyView}>
        <RoundButton 
        //   icon={icons.Ionicons} 
        //   iconName={'close'} 
        //   iconSize={28} 
        //   iconColor={COLORS.subPrimary} 
          style={{
            backgroundColor: 'transparent',
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            margin: 0
          }}
          onPressButton={onClose}
        />

        
        <View style={[styles.searchContainer]}>
                <TextInput
                style={{paddingHorizontal: 15}} 
                placeholder={'Search something...'}
                />
        </View>
        
        <RoundButton 
          icon={icons.Feather} 
          iconName={'arrow-right'} 
          iconSize={28} 
          iconColor={COLORS.grey} 
          style={{
            backgroundColor: 'transparent',
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            margin: 0
          }}
        />
        </View>
        </TouchableOpacity>
        {/* <BlurView intensity={16}  style={{height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white05, zIndex: -1, position:'absolute'}}></BlurView> */}
