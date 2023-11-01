import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import NewInput from '../../../components/components_LogIn/NewInput'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EnterEmail() {

  // -------------------------------------------------------------------- Navigation
  const navigation = useNavigation()

  // -------------------------------------------------------------------- Value
  const [focus, setFocus] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [inputData, setInputData] = useState('')

  const [checkSuccess, setCheckSuccess] = useState(false)
  
  
  const transitionButtonVal = useSharedValue(0)

  // -------------------------------------------------------------------- handle extern Submit
  // Send Link Button
  const handleSendLink = () => {
    setSubmit(true)
    setTimeout(() => {
      setSubmit(false);
    }, 300)
  }

  // Leave Input Layout
  const handleLeaveInput = () => {
    setFocus(false)
    handleButtonTransitionDown()
    setTimeout(() => {
      setFocus(true);
    }, 300)
  }

  // -------------------------------------------------------------------- Modal
  const [showErrorModal, setShowErrorModal] = useState(false)
  
  const onCloseErrorModal = () => {
        setTimeout(() => {
            setShowErrorModal(false);
        }, 300) }
  const handleErrorModal = () => {      
        setShowErrorModal(true)
      }

  // -------------------------------------------------------------------- handle Send-Link-Button Transition
  // translate Button up
  const handleButtonTransitionUp = () => {
    transitionButtonVal.value = withTiming(1, {duration: 450, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
  }

  // translate Button down
  const handleButtonTransitionDown = () => {
    transitionButtonVal.value = withDelay(20, withTiming(0, {duration: 400, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)}) )
  }

  // -------------------------------------------------------------------- handle Log In

  useEffect(() => {
    if (checkSuccess == true) {
      console.log('send request')
      handleServerRequest()
    }
  }, [checkSuccess])

  const handleServerRequest = async () => {
    const url = api_url + 'user/email-login/'
      try {
        const response = await axios.post(url, {
          "email": inputData.toLowerCase()
        })

        // success
        console.log(response.data);
        setTimeout(() => {
          navigation.navigate('CheckEmail', {returnEmail: inputData})
        }, 300)
      } 
        // error
      catch (error) {
        console.log(error.response.data);
      }
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
  
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    
  <View style={{height: height, width: width, backgroundColor: 'white'}}>

    {showErrorModal && <ErrorModal onClose={onCloseErrorModal}/>}
    {/* -------------------------------------------------------------------- onLeaveLayout - Background Pressable */}
    <Pressable 
      style={{
        height: height, 
        width: width, 
        zIndex: 1, 
        position: 'absolute',
      }} 
      onTouchStart={handleLeaveInput} 
    >

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
    <Text style={[styles.title]}>Passwortlose Authentisierung</Text>
    <Text style={styles.infoText}>Wir senden dir an deine E-Mail-Adresse einen Link zu. Klicke den Link an, um dich anzumelden.</Text>

    {/* -------------------------------------------------------------------- InputBox */}
      <NewInput 

        style={{
          marginTop: 25,
        }}
      
        // State
        submitState={submit}
        focusState={focus}

        // show: Button / Icon
        clearButton

        // error Message
        errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
        errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}

        // constant
        checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
        label={'E-Mail'}

        // handle
        onLeaveInput={handleButtonTransitionDown}
        onFocusInput={handleButtonTransitionUp}

        isEditable={true}

        checkSuccess={() => setCheckSuccess(true)}
        checkFailed={() => setCheckSuccess(false)}

        setInputData={setInputData}
      />

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

        // onPress Send Link
        onPress={handleSendLink}

      />

    </Animated.View>

    {/* --------------------------------------------------------------------  handle onBlur Input */}


    </Pressable>
  
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
    fontSize: moderateScale(30,0.2), 
    color: COLORS.primary,
    marginHorizontal: 30,
    //alignSelf: 'center',
    marginTop: 15,
    //textAlign: 'center'
  },

  infoText: {
    marginTop: 10,
    fontFamily: 'RH-Medium',
    fontSize: 15,
    marginHorizontal: 30
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