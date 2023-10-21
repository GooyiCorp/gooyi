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

  // -------------------------------------------------------------------- Navigation
  const navigation = useNavigation()

  // -------------------------------------------------------------------- Value
  const [exitInput, setExitInput] = useState(true)
  const [hideKeyboard, setHideKeyboard] = useState(false)

  // -------------------------------------------------------------------- Modal
  const [showErrorModal, setShowErrorModal] = useState(false)
  
  const onCloseErrorModal = () => {
        setTimeout(() => {
            setShowErrorModal(false);
        }, 300) }
  const handleErrorModal = () => {      
        setShowErrorModal(true)
      }

  // -------------------------------------------------------------------- handle Error Message
  const [error, setError] = useState(false)
  const errorFeedback = useSharedValue(0)

    // show Error Message
    const handleErrorMessage = () => {
      setError(true)
      errorFeedback.value = 1
    }

    // hide Error Message
    const hideErrorMessage = () => {
      setError(false)
      errorFeedback.value = 0
    }

  // -------------------------------------------------------------------- handle Send-Link-Button Transition
  const transitionButtonVal = useSharedValue(0)

    // translate up
    const handleButtonTransitionUp = () => {
      setExitInput(false)
      transitionButtonVal.value = withTiming(1, {duration: 450, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
    }

    // translate down
    const handleButtonTransitionDown = () => {
      setExitInput(true)
      transitionButtonVal.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
    }

  // -------------------------------------------------------------------- handle Log In
  const [inputData, setInputData] = useState('');

  // Check Data Validity - E-Mail
  const checkEmail = () => {
    const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regEX.test(inputData)) return false
    return true   
  }

  // handle onPress Send-Link-Button
  const handleLogin = async () => {
    // Case 1: Data = null -> (return Error Message)
    if (!inputData) {
      handleErrorMessage()
      setTimeout(() => {
        setExitInput(true)
        handleButtonTransitionDown()
      }, 300)
      return; 
    } 

    // Case 2: Data, CheckEmail = failed -> (return Error Message)
    else if (!checkEmail()) {
      handleErrorMessage()
      setTimeout(() => {
        setExitInput(true)
        handleButtonTransitionDown()
      }, 300)
      return;
    }

    // Case 3: no Error -> (send request)
      // hide Error Message 
      hideErrorMessage()

      // server request
      const url = api_url + 'user/email-login/'
      try {
        const response = await axios.post(url, {
          "email": inputData.toLowerCase()
        })

        // success
        console.log(response.data);
        setError(false)
        setExitInput(true)
        handleButtonTransitionDown()
        setTimeout(() => {
          navigation.navigate('CheckEmail', {returnEmail: inputData})
        }, 300)
      } 
        // error
      catch (error) {
        setError(true)
        console.log(error.response.data);
        handleErrorModal()
      }
  }

  // -------------------------------------------------------------------- handle onChangeText
  const onChangeText = (e) => {
    setError(false)
    setInputData(e)
    hideErrorMessage()
  }

  // -------------------------------------------------------------------- handle Send Link Button Transition
  const handleSendLinkButtonTransition = () => {
    !exitInput? handleButtonTransitionUp() : handleButtonTransitionDown()
  }

  // -------------------------------------------------------------------- Animated Style
  // Send Link Button Transition
  const transitionButton = useAnimatedStyle(() => {
    const translateY = interpolate(transitionButtonVal.value, [0,1], [0, -330])
    return {
      transform: [{
        translateY: translateY
      }],
    }
  })

  // Error Message
  const errorMessage = useAnimatedStyle(() => {
    return {
      opacity: errorFeedback.value
    }
  })

  

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    
  <View style={{height: height, width: width, backgroundColor: 'white'}}>

    {showErrorModal && <ErrorModal onClose={onCloseErrorModal}/>}

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
      style={{
        marginTop: 30,
        zIndex:2
      }}
      
      // Condition
      exitInput={exitInput}
      error={error}

      // handle Send-Link-Button Transition
      onFocusInput={handleButtonTransitionUp}
      onLeaveFocus={handleButtonTransitionDown}

      // transfer Input Data
      setInputData={setInputData}

      // Call hide Error Message function
      deleteError={hideErrorMessage}

      // onChangeText
      onChangeText={onChangeText}

      // Call handle onPress Submit
      onSubmit={handleLogin}

      // hide Keyboard
      hideKeyboard={hideKeyboard}

      isEditable={true}
      clearButton
    />

    {/* -------------------------------------------------------------------- Error Message */}
    <Animated.View style={[styles.errorContainer, errorMessage]}>

      <Text style={styles.error}>
        {error && inputData? 'Die eingegebene E-Mail-Addresse ist ungültig!' : 'Das Feld darf nicht leer sein!'}
      </Text>

    </Animated.View>

    {/* -------------------------------------------------------------------- Send Link Button */}
    <Animated.View style={[styles.button, transitionButton]}>

      <BigButton

        // Base
        title={'Link senden'}
        bgStyle={{
          backgroundColor: COLORS.primary
        }}                
        titleStyle={{
          color: COLORS.white, 
          fontFamily: 'Roboto-Medium',
        }}

        // Call handleLogIn
        onPress={handleLogin}

      />

    </Animated.View>

    {/* --------------------------------------------------------------------  handle onBlur Input */}
    <Pressable 

      style={{height: height, width: width, zIndex: 1, position: 'absolute',}} 
      
      // handle Exit Input Box
      onPressIn={() => {setHideKeyboard(true), setExitInput(true)}} 
      //onPressOut={() => {setExitInput(false)}} 

      // handle Transition Send-Link-Button
      onPress={handleSendLinkButtonTransition} 

    />
  
  </View>
  
  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  button: {
    bottom: 30,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2
  },

  title: {
    fontFamily: 'RH-Bold', 
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
    fontFamily: 'RH-Medium',
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