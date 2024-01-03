import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

// Animation
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHideOrderOverviewModal, setHideQueueModal, setShowQueueOverviewModal } from '../../../redux/slices/showModalSlice'
// Constant
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { H1, H2, H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import BigButton from '../../components_LogIn/BigButton'
import { useNavigation } from '@react-navigation/native'
import { setJoinedQueue, setShowQueueSmall } from '../../../redux/slices/queueSlice'
import OfferOrderCard from './OfferOrderCard'
import UnitSetting from './UnitSetting'
import IconLabelButton from '../../components_universal/IconLabelButton'


export default function OrderOverviewModal() {

    // Redux
    const dispatch = useDispatch()
    const showOrderOverviewModal = useSelector((state) => state.showModal.orderOverviewModal)
    const unit = useSelector((state) => state.cart.unit)
    const unitPrice = 19.99
    const price = unit * unitPrice

    // React Navigation
    const navigation = useNavigation()


    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const handleClose = () => {
        dispatch(setHideOrderOverviewModal())
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
        if (showOrderOverviewModal) {
            translateY.value = withTiming(0, {duration: 350, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } 
        else {
            translateY.value = withTiming(0.68*height, {duration: 250,easing: Easing.bezier(0.25, 0.1, 0.25, 1),})
        }
      }, [showOrderOverviewModal])





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
                <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Bestellübersicht</Text>
            </View>

            <View style={{paddingHorizontal: 30}}>
                {/* Title */}
                <Text style={[H4, styles.subTitle]}>Warenkorb</Text>
                
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={[T1, {fontFamily: 'RH-Bold'}]}>Udon Set für 2 Personen</Text>
                        <Text style={T4}>Noosou Asia Kitchen</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <UnitSetting/>
                        <Text style={[T1, {marginTop: 10, fontFamily: 'RH-Medium'}]}>{price.toFixed(2)} €</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={[H4, styles.subTitle]}>Zahlung</Text>
{/* 
                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: COLORS.ivory, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5}}>
                    <Icons
                        icon={icons.Ionicons}
                        iconName={'ios-card'}
                        iconSize={20}
                        iconColor={COLORS.grey}
                    />
                    <Text style={[T2, {marginLeft: 15, fontFamily: 'RH-Medium', color: COLORS.grey}]}>Zahlungsmethode hinzufügen</Text>

                </View> */}

                <IconLabelButton
                    label={'Zahlungsmethode hinzufügen'}
                    icon={icons.Ionicons}
                    iconName={'ios-card'}
                    iconSize={20}
                    iconColor={COLORS.grey}
                    style={{
                        backgroundColor: COLORS.white,
                        height: 40,
                        // width: '100%',
                        paddingHorizontal: 0,
                        borderRadius: 10,
                        // alignSelf: 'flex-end',


                    }}
                    labelStyle={{
                        marginLeft: 5,
                        color: COLORS.grey,
                        fontFamily: 'RH-Medium'
                    }}
                />

                {/* Title */}
                <Text style={[H4, styles.subTitle]}>Zusammenfassung</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[T1]}>Kosten je Einheit</Text>
                    <Text style={[T1]}>{unit} x</Text>
                    <Text style={[T1]}>{unitPrice} €</Text>
                </View>
                <Text style={T4}>inkl. MwSt.</Text>
                    <View style={{width: '100%', borderBottomWidth: 0.5, borderColor: COLORS.grey, marginBottom: 5, marginTop: 10}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>Summe</Text>
                    <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>{price.toFixed(2)} €</Text>
                </View>

                <Text style={[T3,{marginTop: 30}]}>Durch Klicken auf die Schaltfläche stimme ich den <Text onPress={() => console.log('press Datenschutz')} style={[T4, {fontFamily: 'RH-Bold'}]}>Nutzungs- und Verkaufsbedingungen</Text> zu, und bestätige, dass ich die <Text onPress={() => console.log('press Datenschutz')} style={[T4, {fontFamily: 'RH-Bold'}]}>Datenschutzerklärung</Text> gelesen habe.</Text>
            </View>

            
            
            <BigButton 
            title={'Zahlung abschließen'}
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
            

        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 0.68*height,
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
        marginTop: 15,
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        zIndex: 1,
      },

      subTitle: {
        fontFamily: 'RH-Regular', 
        color: COLORS.grey, 
        marginBottom: 10,
        marginTop: 20
    },
    
  
  })