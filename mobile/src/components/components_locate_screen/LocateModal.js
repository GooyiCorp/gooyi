import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import Icons, { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setHideLocateModal } from '../../redux/slices/showModalSlice'
import { H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
import LocateSelectionButton from './LocateSelectionButton'
import { setSelected, setUnselected,  setLocation, setCurrentPosition, setResetPosition, setSupplement } from '../../redux/slices/locateSlice'

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import LocateSelector from './LocateSelector'
import IconLabelButton from '../components_universal/IconLabelButton'
import LocateButton from './LocateButton'
import LocateRequired from '../../screens/root-screens/LocateRequired'

const LOCATION_TASK_NAME = 'background-location-task';
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
  }
});
export default function LocateModal() {

  const navigation = useNavigation()

  // Thanh API
  const getLocation = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    }
    // let { status } = await Location.requestBackgroundPermissionsAsync();
    // if (status !== 'granted') {
    //   alert('Permission to access location was denied');  //Duc anh: Tu choi location
    //   return;
    // }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude}))
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
      const address = response.data.address;
      dispatch(setCurrentPosition(`${address.road} ${address.house_number}`))
      dispatch(setSupplement(`${address.postcode} ${address.city}, ${address.country}`))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getLocation();
  }, [])
  
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // State Handle
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const dispatch = useDispatch()

    const selected = useSelector((state) => state.locate.selected)
    const currentPosition = useSelector((state) => state.locate.currentPosition)
    const supplement = useSelector((state) => state.locate.supplement)

    const handleReset = () => {
      dispatch(setResetPosition())
    }

    const locateButtonList = [
      {id: 1, label: 'Position ermitteln', icon: icons.Ionicons, iconName: 'ios-navigate', iconSize: 25},
      {id: 2, label: 'Standort auswählen', icon: icons.MaterialIcons, iconName: 'add', iconSize: 32},
      {id: 3, label: 'Stadt aussuchen', icon: icons.MaterialIcons, iconName: 'location-city', iconSize: 30},
    ]

    const handlePress = async (row) => {
      if (selected == row.id) {
        dispatch(setUnselected())
        dispatch(setResetPosition())
      } else {
        switch (row.id) {
          case 1: 
            await getLocation()
            dispatch(setSelected(1))
            break
          case 2: 
            console.log('Enter Address')
            navigation.navigate('Locate', {screen: 'EnterPosition'})
            break
          case 3: 
            console.log('Select City')
            navigation.navigate('Locate', {screen: 'CitySelection'})
            break
        }
      }
      // Thanh - lam gi tiep 
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Modal Animation
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
            <Animated.View style={[styles.modalContainer, animatedStyle, {height: selected? 0.6*height : 1.05*height}]}>

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
                        top: selected? 25 : 50,
                        right: 25,
                        zIndex: 2
                    }}
                    onPressButton={handleClose}
                />

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={[styles.topSectionContainer, {marginTop: selected? 10 : 35}]}>
                    <Text style={H3}>Standort Auswahl</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>

              


              {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
              {/* Current Position */}
              {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
              {selected && <>
              <Text style={[T3, {color: COLORS.grey, marginBottom: 5}]}>Mein Standort</Text>

              <View style={{width: width-60, paddingVertical: 5, borderRadius: 16, flexDirection: 'row', marginBottom: 20}}>

                {/* Delete Button  */}
                <TouchableOpacity 
                  style={{position: 'absolute', top: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}
                  onPress={handleReset}
                >
                  <Icons 
                    icon={icons.MaterialIcons}
                    iconName={'close'}
                    iconSize={16}
                    iconColor={COLORS.primary}
                  />
                  <Text style={[T3, {fontFamily: 'RH-Medium', color: COLORS.primary, marginLeft: 2}]}>Löschen</Text>
                </TouchableOpacity>

                {/* Current Position Feed  */}
                <View style={{width: '85%'}}>
                  <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{currentPosition}</Text>
                  <Text style={[T2, {color: COLORS.grey}]}>{supplement}</Text>
                </View>
              
              </View>
              </>}
              
              {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
              {/* Button Row */}
              {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
              {selected && <View style={{width: width-60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: selected? 0 : 30}}>

                {/* Navigate Button */}
                <LocateSelector
                  icon={icons.MaterialCommunityIcons}
                  iconName={'navigation-variant'}
                  iconSize={24}
                  iconColor={selected == 'navigate'? COLORS.ivory : COLORS.grey}
                  style={{
                    backgroundColor: selected == 'navigate'? COLORS.primary : COLORS.ivoryDark,
                    borderColor: selected == 'navigate'? COLORS.primary : COLORS.lightGrey,
                  }}
                />

                {/* City Button */}
                <LocateSelector
                  icon={icons.MaterialIcons}
                  iconName={'location-city'}
                  iconSize={24}
                  iconColor={selected == 'city'? COLORS.ivory : COLORS.grey}
                  style={{
                    backgroundColor: selected == 'city'? COLORS.primary : COLORS.ivoryDark,
                    borderColor: selected == 'city'? COLORS.primary : COLORS.lightGrey,
                  }}  
                />

                {/* Add Address Button */}
                <View style={{width: '31%', flexDirection: 'row', justifyContent: 'space-between'}}>

                {selected == 'add' && <LocateSelector
                  icon={icons.MaterialCommunityIcons}
                  iconName={'map-marker'}
                  iconSize={23}
                  iconColor={COLORS.ivory}
                  style={{
                    width: '45%',
                    borderWidth: 0.5,
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary
                  }} 
                  onPress={handleReset}
                />}
                
                {/* Add */}
                <LocateSelector
                  icon={icons.MaterialIcons}
                  iconName={'add'}
                  iconSize={25}
                  iconColor={COLORS.grey}
                  style={{
                    width: selected == 'add' ? '45%' : '100%',
                    // borderWidth: selected? 0.5 : 0,
                    backgroundColor: COLORS.ivoryDark,
                    // borderColor: COLORS.lightGrey,
                  }}
                  onPress={() => navigation.navigate('Locate', {screen: 'EnterPosition'})}
                />

                </View>

              </View>}

              
              {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5}]}>Zuletzt verwendet</Text> */}

              
              {/* <View style={styles.currentPositionFeed}>
                  <Text style={[T3, {color: COLORS.grey}]}>Aktuelle Position</Text>
                  <Text style={[T1, {marginTop: 5, fontFamily: 'RH-Medium'}]}>{currentPosition}</Text>
              </View>
              <View style={styles.line2}></View> */}
              {/* <View style={styles.buttonView}>
                {locateButtonList.map((list) => 
                  <LocateSelectionButton 
                    key={list.id}
                    label={list.label}
                    icon={list.icon}
                    iconName={list.iconName}
                    iconSize={list.iconSize}
                    iconColor={list.id === selected? COLORS.grey : COLORS.lightGrey}
                    bgStyle={{
                      backgroundColor: list.id === selected? COLORS.ivoryDark : 'transparent',
                      borderColor: list.id === selected? COLORS.ivoryDark : COLORS.borderGrey,
                      borderWidth: 0.5
                    }}
                    labelStyle={{fontFamily: list.id === selected? 'RH-Medium' : 'RH-Regular', color: list.id === selected? COLORS.black : COLORS.grey}}
                    onPress={() => handlePress(list)}
                  />
                )}
              </View> */}
            </View>

            {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Unselected */}
            {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
            
            {!selected && <LocateRequired />}

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
      paddingBottom: 20,
      zIndex: 1,
    },
  
    midSectionContainer: {
      height: 0.3*height,
      width: width,
      paddingHorizontal: 30,
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

    positionView: {
      height: 60,
      width: 60,
      backgroundColor: COLORS.ivory,
      borderRadius: 16
    },

    rightView: {
      width: '15%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'green',
      zIndex: 2,
  },
  
  })