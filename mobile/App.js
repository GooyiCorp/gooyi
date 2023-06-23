import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, SafeAreaView, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import GestureRecognizer from 'react-native-swipe-gestures';
import { LinearGradient } from 'expo-linear-gradient';


import AppIntroSlider from 'react-native-app-intro-slider';
import welcome from './src/constants/welcome';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SCREEN_WIDTH } from './src/constants/size.js';

import SignIn from './src/components/molecules/SignIn.js';
import SignUp from './src/components/molecules/SignUp';
import PaginationBar from './src/components/atoms/PaginationBar';
const logo = require('./assets/logo/logo.png');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  });
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // slide animation -----------------------------------------------
  const width = useRef(new Animated.Value(1)).current
  const nextSlide = useRef(null)
  const indexRef = useRef(0)
  const [swipeVelocity, setSwipeVelocity] = useState(0);
  const changeSlide = (index) => {
    if (index <= 0) index = 0
    if (index >= 3) index = 3
    nextSlide.current = index
    Animated.spring(width, {
      toValue: 25 * (index + 1) * SCREEN_WIDTH * 0.8 * 0.01,
      useNativeDriver: false,
    }).start()
  }
  
  // ----------------------------------------------------------------
  useEffect(() => {
    changeSlide(0)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return (
      <View style={styles.splashScreen}>
        <Image source={logo} style={styles.splashImage} />
      </View>
    )
  }
  if (!fontsLoaded) {
    return null;
  }
  const onCloseSignIn = () => setShowSignIn(false);
  const onCloseRegister = () => setShowRegister(false);

  let appIntroSliderRef = null;
  if (!showHomePage) {
    

    return (
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          ref={(ref) => (appIntroSliderRef = ref)}
          style={styles.intro}
          data={welcome}
          renderPagination={() => null}
          renderItem={({ item, index, slides }) => {
            const panResponder = PanResponder.create({
              onStartShouldSetPanResponder: () => true,
              onPanResponderMove: (_, gestureState) => {
                setSwipeVelocity(gestureState.vx);
                if (swipeVelocity > 0 && Math.abs(gestureState.moveX) > 30) {
                  changeSlide(index - 1)
                } else if (swipeVelocity < 0 && Math.abs(gestureState.moveX) > 30) {
                  changeSlide(index + 1)
                }
                
              },
              onPanResponderTerminationRequest: ()=>{},
              onPanResponderRelease: () => {
                setSwipeVelocity(0)
                setTimeout(() => {
                  if (indexRef.current != nextSlide.current) changeSlide(indexRef.current)
                }, 322);
              }
 
            });
            if (index === welcome.length - 1) {
              return (
                <LinearGradient {...panResponder.panHandlers}
                  colors={['rgb(187,95,113)', 'rgba(211,128,145,1)', 'rgba(239,151,171,1)', 'rgba(229,150,167,1)', 'rgba(206,120,138,1)', 'rgba(182,87,107,1)']}
                  locations={[0, 0.14, 0.24, 0.6, 0.74, 1]}
                  style={styles.slider}>
                  <Image source={item.image} style={{ height: moderateScale(280) }} resizeMode="contain" />
                  <Text style={styles.sliderText}>{item.text}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowSignIn(true)}
                  >
                    <Text style={styles.buttonText}>Anmelden</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => setShowRegister(true)}
                  >
                    <Text style={styles.registerText}>Registrieren</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )
            }
            return ( 
              <LinearGradient {...panResponder.panHandlers}
                colors={['rgb(187,95,113)', 'rgba(211,128,145,1)', 'rgba(239,151,171,1)', 'rgba(229,150,167,1)', 'rgba(206,120,138,1)', 'rgba(182,87,107,1)']}
                locations={[0, 0.14, 0.24, 0.6, 0.74, 1]}
                style={styles.slider}>
                <Image source={item.image} style={{ height: moderateScale(280), marginBottom: verticalScale(30) }} resizeMode="contain" />
                <Text style={styles.sliderText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    appIntroSliderRef.goToSlide(welcome.length - 1);
                    changeSlide(3)
                  }}
                >
                  <Text style={styles.buttonText}>Los Geht's</Text>
                </TouchableOpacity>
              </LinearGradient>
            )
          }}
          onSlideChange={(index) => { 
            changeSlide(index); 
            indexRef.current = index}
          }
        />
        <PaginationBar width={width} />
        <GestureRecognizer
          onSwipeDown={onCloseSignIn}
        >
          <Modal
            visible={showSignIn}
            animationType="slide"
            transparent={true}

          >
            <SignIn onClose={onCloseSignIn} homepage={setShowHomePage} />
          </Modal>
        </GestureRecognizer>
        <GestureRecognizer
          onSwipeDown={onCloseRegister}
        >
          <Modal
            visible={showRegister}
            animationType="slide"
            transparent={true}
          >
            <SignUp onClose={onCloseSignIn} homepage={setShowHomePage} />
          </Modal>
        </GestureRecognizer>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashScreen: {
    flex: 1,
    backgroundColor: '#B84058',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splashImage: {
    width: scale(263),
    height: scale(100)
  },
  intro: {
    backgroundColor: '#E192A2',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(25),
    width: scale(250),
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: '#B84058',
    paddingVertical: verticalScale(14),
    borderRadius: 30,
    marginTop: 20,
    width: moderateScale(200),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(15),
    // paddingHorizontal: moderateScale(70),
    width: moderateScale(200),
    borderRadius: 30,
    marginTop: verticalScale(10),
  },
  registerText: {
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
});
