import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, SafeAreaView, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AppIntroSlider from './src/screens/AppIntroSlider.js';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStack.js';

const logo = require('./assets/logo/logo.png');

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
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
      <RootStackNavigator />
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