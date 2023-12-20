import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming, ReduceMotion, reduceMotion} from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import Icons, { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setHideLocateModal } from '../../redux/slices/showModalSlice'
import { H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
import LocateSelectionButton from './LocateSelectionButton'
import { setSelected, setUnselected, setCurrentPosition, setResetPosition, setSupplement, setLocation } from '../../redux/slices/locateSlice'

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import LocateSelector from './LocateSelector'
import IconLabelButton from '../components_universal/IconLabelButton'
import LocateButton from './LocateButton'
import LocateRequired from '../../screens/locate_screens/LocateRequired'
import CurrentPositionFeed from './CurrentPositionFeed'
import { store } from '../../redux/store'

const LOCATION_TASK_NAME = 'background-location-task';
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { longitude, latitude } = data.locations[0].coords;
    store.dispatch(setLocation({ lat: latitude, long: longitude }));
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
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');  //Duc anh: Tu choi location
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude}))
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
      const address = response.data.address;

      // set State
      dispatch(setCurrentPosition(`${address.road} ${address.house_number ? address.house_number: ''}`))
      dispatch(setSupplement(`${address.postcode} ${address.city}, ${address.country}`))
      dispatch(setSelected('navigate'))
      
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

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Modal Animation
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showLocateModal = useSelector((state) => state.showModal.locateModal)

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        dispatch(setHideLocateModal())
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
        if (selected? (translateY.value > 0.2*height) : (translateY.value > 0.3*height)) {
            runOnJS(handleClose)()
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
            translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
        } else {
            translateY.value = withTiming(selected? 0.6*height : 1.05*height, {duration: 600, easing: Easing.out(Easing.poly(4))})
        }
      }, [showLocateModal])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
        
  <GestureDetector gesture={gesture}>

    {/* Modal Container ---------------------------------------------------- */}
    <Animated.View style={[styles.modalContainer, animatedStyle, {height: selected? 0.5*height : 1.05*height}]}>

    {/* -------------------------------------------------------------------- Line */}
    <View style={styles.line}></View>


    {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
    {/* Unselected */}
    {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
    <View style={{opacity: selected? 0 : 1}}>
    {/* Close Button */}
    <RoundButton 
      icon={icons.MaterialIcons}
      iconName={'close'}
      iconSize={moderateScale(28,0.2)}
      iconColor={COLORS.white}
      style={{
          backgroundColor: COLORS.grey,
          height: moderateScale(38,0.2),
          width: moderateScale(38,0.2),
          margin: 0,
          position: 'absolute',
          top: 60,
          left: 30,
          zIndex: 2,
      }}
      onPressButton={handleClose}
    />
    
    {/* Main */}
    <LocateRequired
      onPressNavigate={getLocation}
    />
    </View>
            

    {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
    {/* Selected */}
    {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
    {selected && <>

    {/* Header Button Row */}
    <View style={{position: 'absolute', top: 25,right: 25, zIndex: 2, flexDirection: 'row'}}>

      {/* Reset Button */}
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
          onPressButton={handleReset}
      />

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
            <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Standort Auswahl</Text>
    </View>

    {/* Mid Section */}
    <View style={styles.midSectionContainer}>
              
    <CurrentPositionFeed 
      currentPosition={currentPosition}
      supplement={supplement}
    />
              
    {/* Button Row */}
    <View style={{width: width-60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>

      {/* Navigate Button */}
      <LocateSelector
        icon={icons.MaterialCommunityIcons}
        iconName={'navigation-variant'}
        iconSize={24}
        iconColor={selected == 'navigate'? COLORS.ivory : COLORS.grey}
        style={{
          backgroundColor: selected == 'navigate'? COLORS.primary : COLORS.ivoryDark,
        }}
        onPress={getLocation}
      />

      {/* Add */}
      <LocateSelector
        icon={icons.MaterialIcons}
        iconName={'add'}
        iconSize={25}
        iconColor={selected == 'add'? COLORS.ivory : COLORS.grey}
        style={{
          backgroundColor: selected == 'add'? COLORS.primary : COLORS.ivoryDark,
        }}
        onPress={() => navigation.navigate('Locate', {screen: 'EnterPosition'})}
      />

      {/* City Button */}
      <LocateSelector
        icon={icons.MaterialIcons}
        iconName={'location-city'}
        iconSize={24}
        iconColor={selected == 'city'? COLORS.ivory : COLORS.grey}
        style={{
          backgroundColor: selected == 'city'? COLORS.primary : COLORS.ivoryDark,
        }}
        onPress={() => navigation.navigate('Locate', {screen: 'CitySelection'})}
      />

    </View>
    </View>
    </>}

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
      borderRadius: 2,
      zIndex: 2
    },
  
    topSectionContainer: {
      width: width,
      marginTop: 15,
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