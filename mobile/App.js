import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, SafeAreaView, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { scale, verticalScale, moderateScale } from './src/helper/scale.js';
import * as Linking from "expo-linking";
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import RootNav from './src/navigation/N-RootNav.js';
import {Platform} from 'react-native';
import { Delete, Save } from './src/helper/store.js';
const logo = require('./assets/logo/logo.png');
const prefix = Linking.createURL('/', {scheme: 'exp'})

export default function App() {

  // const navigation = useNavigation()
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),

    'RH-Bold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'), 
    'RH-Black': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Black.ttf'), 
    'RH-ExtraBold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-ExtraBold.ttf'), 
    'RH-Regular': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Regular.ttf'), 
    'RH-Light': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Light.ttf'), 
    'RH-Medium': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Medium.ttf'), 
    'RH-SemiBold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-SemiBold.ttf'), 
    
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        RegisterEmail: {
          path: "register",
          screens: {
            EnterUserInformation: 'enterinfo',
          }, 
        },
      },
    }
  }
  
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

 
  return (
    <NavigationContainer linking={linking}>
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