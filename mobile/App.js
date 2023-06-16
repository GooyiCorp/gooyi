import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import GestureRecognizer from 'react-native-swipe-gestures';


import AppIntroSlider from 'react-native-app-intro-slider';
import welcome from './src/constants/welcome';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



import SignIn from './src/components/molecules/SignIn.js';
const logo = require('./assets/logo/logo.png');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
  });
  const [showSignIn, setShowSignIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return (
      <View style={styles.splashScreen}>
        <Image source={logo} style={styles.splashImage}/>
      </View>
    )
  }
  if (!fontsLoaded) {
    return null;
  }
  const onCloseSignIn = () => setShowSignIn(false);
  let appIntroSliderRef = null;
  if (!showHomePage) {
    return (
      <>
      <AppIntroSlider
        ref={(ref) => (appIntroSliderRef = ref)}
        style={styles.intro}
        data={welcome}
        renderItem={({ item, index, slides }) => {
          if (index === welcome.length - 1) {
            return (
              <View style={styles.slider}>
                <Text style={styles.sliderText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowSignIn(true)}
                >
                  <Text style={styles.buttonText}>Anmelden</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerButton}

                >
                  <Text style={styles.registerText}>Registrieren</Text>
                </TouchableOpacity>
              </View>
            )
          }
          return (
            <View style={styles.slider}>
              <Text style={styles.sliderText}>{item.text}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  appIntroSliderRef.goToSlide(welcome.length - 1);
                }}
              >
                <Text style={styles.buttonText}>Los Geht's</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        showDoneButton={false}
        showNextButton={false}
        onDone={() => setShowHomePage(true)}
      />
        <GestureRecognizer
          onSwipeDown={onCloseSignIn}
        >
          <Modal
            visible={showSignIn}
            animationType="slide"
            transparent={true}
          >
            <SignIn onClose={onCloseSignIn} homepage={setShowHomePage}/>
          </Modal>
        </GestureRecognizer>
      </>

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
  splashScreen:{
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
    fontSize: 30,
    width: scale(250),
  },
  button: {
    backgroundColor: '#B84058',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 21,
    marginTop: 20,
    width: scale(150),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: scale(11),
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 21,
    marginTop: 20,
    width: scale(150),
  },
  registerText: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: scale(11),
    textAlign: 'center',
  },
});
