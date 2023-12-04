import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// Animation
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHideQueueModal } from '../../../redux/slices/showModalSlice'
// Constant
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { H1, H2, H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import BigButton from '../../components_LogIn/BigButton'
import { useNavigation } from '@react-navigation/native'
import { setJoinedQueue } from '../../../redux/slices/queueSlice'


export default function QueueModal() {

    // Redux
    const dispatch = useDispatch()
    const showQueueModal = useSelector((state) => state.showModal.queueModal)

    // Animation -----------------------------------------------------------------------------------------------------------
    const navigation = useNavigation()


    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})

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
        if (translateY.value > 0.1*height) {
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
            translateY.value = withTiming(0, {duration: 350, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } 
        else {
            translateY.value = withTiming(0.35*height, {duration: 250,easing: Easing.bezier(0.25, 0.1, 0.25, 1),})
        }
      }, [showQueueModal])

    const [numPerson, setNumPerson] = useState(1)

    const handleAddPerson = () => {
        setNumPerson(numPerson+1)
    }

    const handleRemovePerson = () => {
        numPerson != 1 ? setNumPerson(numPerson-1) : null
    }

    const handleConfirm = () => {
        navigation.navigate('QueueOverview')
        dispatch(setJoinedQueue())
        setTimeout(() => {
            dispatch(setHideQueueModal())
        }, 500)
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}
            <View style={{position: 'absolute', top: 25,right: 25, zIndex: 2, flexDirection: 'row'}}>
            {/* Close Button */}
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
                onPressButton={handleClose}
            />
            </View>

            {/* Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={H3}>Anzahl der Besucher</Text>
            </View>

            {/* -------------------------------------------------------------------- Content Section */}

            <View style={{paddingHorizontal: 30}}>
                {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, alignSelf: 'center'}]}>Anzahl der Personen</Text> */}
                <View style={{justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flexDirection: 'row', paddingHorizontal: 60}}>
                    <RoundButton 
                        icon={icons.Ionicons}
                        iconName={'ios-remove'}
                        iconSize={38}
                        iconColor={numPerson == 1 ? COLORS.white : COLORS.grey}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        onPressButton={handleRemovePerson}
                        activeOpacity={numPerson == 1 ? 1 : 0.3}
                    />
                    <Text style={[H2, {fontSize: 68}]}>{numPerson}</Text>
                    <RoundButton 
                        icon={icons.Ionicons}
                        iconName={'ios-add'}
                        iconSize={38}
                        iconColor={COLORS.grey}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        onPressButton={handleAddPerson}
                    />
                </View>
            </View>

            <BigButton 
            title={'Angaben bestätigen'}
            bgStyle={{
                backgroundColor: COLORS.primary,
                position: 'absolute',
                zIndex: 2,
                bottom: 30,
            }}
            titleStyle={{
                color: COLORS.white
            }}
            onPress={handleConfirm}
        />  
            

        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 0.35*height,
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
  
    topSectionContainer: {
        width: width,
        marginTop: 10,
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        zIndex: 1,
    },
    
  
  })