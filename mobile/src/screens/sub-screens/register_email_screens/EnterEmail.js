import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'

import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../index/constantsindex'
import InputBox from '../../../components/components_LogIn/InputBox'

import BigButton from '../../../components/components_LogIn/BigButton'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import axios from 'axios'
import { api_url } from '../../../constants/api'
import ErrorModal from '../../../components/components_LogIn/ErrorModal'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EnterEmail() {

  // {/* -------------------------------------------------------------------- Navigation */}
  const navigation = useNavigation()

  // {/* -------------------------------------------------------------------- Value */}
  const [dismiss, setDismiss] = useState(false)
  const [error, setError] = useState(false)

  const transitionButtonVal = useSharedValue(0)
  const errorFeedback = useSharedValue(0)

  // {/* -------------------------------------------------------------------- handle Transition */}
  const handleButtonTransitionUp = () => {
    transitionButtonVal.value = withTiming(1, {duration: 450, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
  }

  const handleButtonTransitionDown = () => {
    checkEmail()
    transitionButtonVal.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
  }

  // {/* -------------------------------------------------------------------- Animated Style */}
  const transitionButton = useAnimatedStyle(() => {
    const translateY = interpolate(transitionButtonVal.value, [0,1], [0,-330])
    return {
      transform: [{
        translateY: translateY
      }],
    }
  })

  const errorMessage = useAnimatedStyle(() => {
    return {
      opacity: errorFeedback.value
    }
  })

  // {/* -------------------------------------------------------------------- handle Log In */}
  const [email, setEmail] = useState("");
  const checkEmail = () => {
    const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regEX.test(email)) return false
    return true
    
  }
  const handleLogin = async () => {
    if (!email) {
      setError(true)
      errorFeedback.value = withDelay(100, withTiming(1, {duration: 200})) 
      return; 
    } else if (!checkEmail()) {
      setError(true)
      errorFeedback.value = withDelay(100, withTiming(1, {duration: 200})) 
      return;
    }
    errorFeedback.value = 0
    const url = api_url + 'user/email-login/'
    try {
      const response = await axios.post(url, {
        "email": email.toLowerCase()
      })
      console.log(response.data);
      setError(false)
    } catch (error) {
      setError(true)
      console.log(error.response.data);
      // handleError()
    }
  }

  const onChangeText = (e) => {
    setError(false)
    setEmail(e)
    errorFeedback.value = 0 

  }

  //  Modal ----------------------------------------------------------------------
  const [showErrorModal, setShowErrorModal] = useState(true)
  const onCloseErrorModal = () => {
        setTimeout(() => {
            setShowErrorModal(false);
        }, 300) }
  const handleError = () => {
            
        setShowErrorModal(true)

          
      }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    
  <View style={{height: height, width: width, backgroundColor: 'white'}}>

    {/* {showErrorModal && <ErrorModal onClose={onCloseErrorModal}/>} */}

    {/* -------------------------------------------------------------------- Go Back Button */}
    <RoundButton
      icon={icons.Ionicons}
      iconName={'md-chevron-back'}
      iconSize={moderateScale(28,0.2)}
      iconColor={COLORS.white}
      style={{
        backgroundColor: COLORS.grey,
        height: moderateScale(38,0.2),
        width: moderateScale(38,0.2),
        marginLeft: 30,
        marginTop: 60,
        zIndex: 2,
      }}
      onPressButton={() => navigation.navigate('Main')}
    />

    {/* -------------------------------------------------------------------- Header, SubHeader */}
    <Text style={[styles.title]}>Anmelden ganz{"\n"}ohne Passwort!</Text>
    <Text style={styles.subHeaderStyle}>Wir senden dir an deine E-Mail-Adresse einen {"\n"}Link zu, der dich sofort anmeldet.</Text>

    {/* -------------------------------------------------------------------- InputBox */}
    <InputBox 
      label={'E-Mail'}
      dismiss={dismiss}
      setDismiss={setDismiss}
      style={{
        marginTop: 30,
        zIndex:2
      }}
      onFocusInput={handleButtonTransitionUp}
      onLeaveFocus={handleButtonTransitionDown}
      setOutput={setEmail}
      error={error}
      setError={setError}
      deleteError={() => errorFeedback.value = withTiming(0, {duration: 0})}
      onChangeText={onChangeText}
    />

    {/* -------------------------------------------------------------------- Error Message */}
    <Animated.View style={[styles.errorContainer, errorMessage]}>
      <Text style={styles.error}>{error && email? 'Die eingegebene E-Mail-Addresse ist ungültig!' : 'test'}</Text>
    </Animated.View>

    {/* -------------------------------------------------------------------- Send Link Button */}
    <Animated.View style={[styles.button, transitionButton]}>
      <BigButton
        title={'Link senden'}
        bgStyle={{
          backgroundColor: COLORS.primary
        }}                
        titleStyle={{
          color: COLORS.white, 
          fontFamily: 'Roboto-Medium',
        }}
        onPress={handleLogin}
      />
    </Animated.View>

    {/* --------------------------------------------------------------------  handle Outside Input */}
    <Pressable style={{height: height, width: width, zIndex: 1, position: 'absolute'}} onPressIn={() => {setDismiss(true)}} onPressOut={() => {setDismiss(false)}} onPress={() => !dismiss? handleButtonTransitionUp() : handleButtonTransitionDown()}></Pressable>
  
  </View>
  
  )
}

const styles = StyleSheet.create({

  button: {
    bottom: 30,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2
  },

  title: {
    fontFamily: 'RH-Black', 
    fontSize: moderateScale(40,0.2), 
    color: COLORS.subPrimary,
    lineHeight: 44,
    marginHorizontal: 30,
    alignSelf: 'center',
    marginTop: 100,
    textAlign: 'center'
  },

  subHeaderStyle: {
    marginTop: 20,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    marginHorizontal: 30,
    alignSelf: 'center',
    textAlign: 'center'
  },

  error: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: COLORS.primary
  },

  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 50,
    backgroundColor: COLORS.primary02,
  }
})