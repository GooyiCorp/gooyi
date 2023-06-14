import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import welcome from './src/constants/welcome';

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const onDone = () => {
    setShowHomePage(true);
  }
  if (!showHomePage) {
    return (
      <AppIntroSlider 
        style={styles.slider}
        data={welcome}
        renderItem={({ item }) => {
          return <Text style={styles.slider}>{item.text}</Text>
        }}
        showNextButton
        onDone={onDone}
      />
    ) 
  }
  
  return (
    <View style={styles.container}>
      <Text>ok</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    backgroundColor: '#000',
    color: '#fff',
  }
});
