import React, { useState } from 'react'; 
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';


import AppIntroSlider from 'react-native-app-intro-slider';
import welcome from './src/constants/welcome';

import { normalize } from './src/constants/size.js';

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  let appIntroSliderRef = null;

  if (!showHomePage) {
    return (
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
    ) 
  }
  
  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
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
  intro: {
    backgroundColor: '#E192A2',
  },
  slider: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    width: normalize(250),
  },
  button: {
    backgroundColor: '#B84058',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 21,
    marginTop: 20,
    width: normalize(150),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: normalize(11),
    textAlign: 'center',
  },
  registerButton:{
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 21,
    marginTop: 20,
    width: normalize(150),
  },
  registerText: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: normalize(11),
    textAlign: 'center',
  }
});
