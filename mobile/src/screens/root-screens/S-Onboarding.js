import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import BigButton from '../../components/components_LogIn/BigButton'
import welcome from '../../constants/welcome'
import AppIntroSlider from '../AppIntroSlider'
import { Image } from 'react-native'
import { moderateScale } from '../../helper/scale'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

export default function Onboarding({navigation}) {



  return (
  <Pressable onPress={() => navigation.navigate('Main')}>
    <View style={styles.screen}>

    <View style={styles.logoBox}>
      <Image
        source={require('../../../assets/logo/logo.png')}
        resizeMode='contain'
        style={styles.image}
      />
    </View>

    <View style={styles.imageBox}>
      <Image 
        source={require('../../../assets/image/foxSlide1.png')}
        resizeMode='contain'
        style={styles.image}
      />   
    </View>

    <Text style={styles.h1}>Moin moin!</Text>
    <Text style={[styles.h5]}>Tippe zum Start auf dem Bildschirm.</Text>
      {/* -------------------------------------------------------------------- Start Button */}
      {/* <BigButton

        // Base
        title={"Los geht's"}
        bgStyle={{
            backgroundColor: COLORS.white03,
            position: 'absolute',
            bottom: 30,
            zIndex: 2,
        }}                
        titleStyle={{
            color: COLORS.white, 
            fontFamily: 'Roboto-Medium',
        }}

        // Call handle
        onPress={() => null}
        //handleSendLink
      /> */}

    </View>
  </Pressable>  
  )
}

const styles = StyleSheet.create({

  screen: {
    height: height,
    width: width,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    maxWidth: '90%',
  },

  imageBox: {
    height: 350,
    width: width-40,
    //backgroundColor: COLORS.subPrimary02,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
    marginTop: 50
  },

  logoBox: {
    height: 50,
    width: 0.3*width,
    // position: 'absolute',
    // top: 0,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
  },

  h1: {
    fontFamily: 'RH-Black', 
    fontSize: moderateScale(50,0.2), 
    color: COLORS.white,
    marginTop: 50,
    alignSelf: 'center'
  },

  h5: {
    marginTop: 10,
    fontFamily: 'RH-Medium',
    fontSize: 15,
    marginHorizontal: 30,
    color: COLORS.white05,
    textAlign: 'center'
  }

})