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

export default function EnterEmail() {

  const navigation = useNavigation()

  const [dismiss, setDismiss] = useState(false)

  const transitionButtonVal = useSharedValue(0)
  const buttonOpacity = useSharedValue(1)

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
      opacity: buttonOpacity.value
    }
  })

  return (
    
  <>

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
        marginTop: 60
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
        marginTop: 30
      }}
      onFocusInput={handleButtonTransitionUp}
      onLeaveFocus={handleButtonTransitionDown}
    />

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
      />
    </Animated.View>

    <Pressable style={{height: height, width: width, zIndex: -1, position: 'absolute', backgroundColor: 'white'}} onPressIn={() => {setDismiss(true)}} onPressOut={() => {setDismiss(false)}} onPress={() => !dismiss? handleButtonTransitionUp() : handleButtonTransitionDown()}></Pressable>
  </>
  
  )
}

const styles = StyleSheet.create({

  button: {
    bottom: 30,
    position: 'absolute',
    alignSelf: 'center'
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
  }
})