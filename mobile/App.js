import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, SafeAreaView, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { scale, verticalScale, moderateScale } from './src/helper/scale.js';
import AppIntroSlider from './src/screens/AppIntroSlider.js';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze, enableScreens } from "react-native-screens";

import RootNav from './src/navigation/N-RootNav.js';
import { width, height } from './src/constants/size.js';

const logo = require('./assets/logo/logo.png');

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
  });
  useEffect(() => {
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
  if (!showHomePage) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <AppIntroSlider setShowHomePage={setShowHomePage} />
      </GestureHandlerRootView>
    )
  }
  return (
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
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
});