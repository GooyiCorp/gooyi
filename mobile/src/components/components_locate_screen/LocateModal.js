import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect } from 'react'
// Reanimated
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming, ReduceMotion, reduceMotion} from 'react-native-reanimated'
// Gesture Handler
import { Gesture, GestureDetector} from 'react-native-gesture-handler'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Axios
import axios from 'axios';
// Constants
import { height, width } from '../../constants/size'
import { H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
import { COLORS } from '../../index/constantsindex'
// Helpers
import { moderateScale } from '../../helper/scale'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store'
import { setHideLocateModal, setShowFilterModal } from '../../redux/slices/showModalSlice'
import { setSelected, setUnselected, setCurrentPosition, setResetPosition, setSupplement, setLocation } from '../../redux/slices/locateSlice'
// Components
import RoundButton from '../components_universal/RoundButton'
import LocateSelector from './LocateSelector'
import LocateRequired from '../../screens/locate_screens/LocateRequired'
import CurrentPositionFeed from './CurrentPositionFeed'
import { icons } from '../components_universal/Icons'
// ---- Unsorted
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'


// ------------------------------------------------
// Location Section - Thanh
// ------------------------------------------------
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LocateModal() {

// React Navigation
const navigation = useNavigation()
// Redux
const dispatch = useDispatch()

// ---- State
const selected = useSelector((state) => state.locate.selected)
const currentPosition = useSelector((state) => state.locate.currentPosition)
const supplement = useSelector((state) => state.locate.supplement)

// ----------------------------  
// Modal Setting 
// ---------------------------- 
  // ---- Value 
  const translateY = useSharedValue(height)
  const context = useSharedValue({y: 0})
  const showLocateModal = useSelector((state) => state.showModal.locateModal)

  // ---- handle Close
  const handleClose = () => {
      dispatch(setHideLocateModal())
  } 

  // ---- handle Gesture
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

  // ---- handle Animation
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

// ----------------------------  
// Location Setting 
// ---------------------------- 
  // Handle Reset Position
  const handleReset = () => {
    dispatch(setResetPosition())
  }
  // ---- start - Thanh API Section
  const long = useSelector((state) => state.locate.long)
  const lat = useSelector((state) => state.locate.lat)
  const getLocation = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    } else {
      alert('Permission to access location was denied');  //Duc anh: Tu choi location

    }
    // let { status } = await Location.requestBackgroundPermissionsAsync();
    // if (status !== 'granted') {
    //   return;
    // }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude}))
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
      const address = response.data.address;

      // set State
      dispatch(setCurrentPosition(`${address.road} ${(typeof address.house_number != 'undefined' ? address.house_number : '')}`))
      dispatch(setSupplement(`${address.postcode} ${address.city}, ${address.country}`))
      dispatch(setSelected('navigate'))
      
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() =>{
    if (!long || !lat) {
      getLocation()
    }
  }, [long, lat])

  // ---- end - Thanh API Section

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
// Gesture Handler
<GestureDetector gesture={gesture}>

  {/* Modal Container */}
  <Animated.View 
    style={[
      styles.modalContainer, 
      animatedStyle, 
      {
        // Switch Height : Selected / Unselected Position
        height: selected? 0.5*height : 1.05*height
      }
    ]}
  >

  {/*  Line */}
  <View style={styles.line}></View>

  {/* ------------------------------------------------ */}
  {/* Return Case : Unselected */}
  {/* ------------------------------------------------ */}
  <View style={{opacity: selected? 0 : 1}}>
    {/* Exit Button */}
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
            
  {/* ------------------------------------------------ */}
  {/* Return Case : Selected */}
  {/* ------------------------------------------------ */}
  {selected && 
  <>
    {/* ---- start - Button Container */}
      {/* Left View */}
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
        {/* Exit Button */}
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
    {/* ---- end - Button Container */}

    {/* Header */}
    <View style={styles.topSectionContainer}>
      <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Standort Auswahl</Text>
    </View>

    {/* ---- start - Mid Section */}
    <View style={styles.midSectionContainer}>
      {/* return Current Position */}
      <CurrentPositionFeed 
        currentPosition={currentPosition}
        supplement={supplement}
      />
      {/* ---- start - Button Section */}
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
        {/* Add Position Button */}
        <LocateSelector
          icon={icons.MaterialIcons}
          iconName={'add'}
          iconSize={25}
          iconColor={selected == 'add'? COLORS.ivory : COLORS.grey}
          style={{
            backgroundColor: selected == 'add'? COLORS.primary : COLORS.ivoryDark,
          }}
          onPress={() => navigation.navigate('EnterPosition')}
        />
        {/* City Selection Button */}
        <LocateSelector
          icon={icons.MaterialIcons}
          iconName={'location-city'}
          iconSize={24}
          iconColor={selected == 'city'? COLORS.ivory : COLORS.grey}
          style={{
            backgroundColor: selected == 'city'? COLORS.primary : COLORS.ivoryDark,
          }}
          onPress={() => navigation.navigate('SelectCity')}
        />
      </View>
      {/* ---- end - Button Section */}
    </View>
    {/* ---- end - Mid Section */}
  </>
  }

  </Animated.View>
</GestureDetector>
)
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  modalContainer: {
    height: 0.6*height,
    width: width,
    position: 'absolute',
    zIndex: 6,
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