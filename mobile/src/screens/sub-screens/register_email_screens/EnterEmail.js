import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'
import { MainHeader, SubHeader } from '../../../index/navIndex'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../index/constantsindex'
import InputBox from '../../../components/components_LogIn/InputBox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BigButton from '../../../components/components_LogIn/BigButton'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import axios from 'axios'
import { api_url } from '../../../constants/api'

export default function EnterEmail() {

  const navigation = useNavigation()

  const [dismiss, setDismiss] = useState(false)
  const [error, setError] = useState(false)

  const transitionButtonVal = useSharedValue(0)
  const errorFeedback = useSharedValue(0)

  const handleButtonTransitionUp = () => {
    transitionButtonVal.value = withTiming(1, {duration: 450, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
  }

  const handleButtonTransitionDown = () => {
    transitionButtonVal.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.380, 0.700, 0.125, 1.000)})
  }

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
  // --Log in --
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    const url = api_url + 'user/email-login/'
    try {
      const response = await axios.post(url, {
        "email": email.toLowerCase()
      })
      console.log(response.data);
      setError(false)
      errorFeedback.value = withTiming(0, {duration: 100})
    } catch (error) {
      console.log(error.response.data);
      setError(true)
      errorFeedback.value = withTiming(1, {duration: 100})
    }
  }
  return (
    
  <View style={{height: height, width: width, backgroundColor: 'white'}}>

    {/* Go Back Buttom */}
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
  <View>

    <Text style={[styles.title]}>Anmelden ganz{"\n"}ohne Passwort!</Text>
  </View>
    <Text style={styles.subHeaderStyle}>Wir senden dir an deine E-Mail-Adresse einen {"\n"}Link zu, der dich sofort anmeldet.</Text>

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
      deleteError={() => errorFeedback.value = withTiming(0)}
    />

    <Animated.View style={[styles.errorContainer, errorMessage]}>
      <Text style={styles.error}>Die eingegebene E-Mail-Addresse ist ungültig!</Text>
    </Animated.View>

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