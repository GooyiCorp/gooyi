import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming} from 'react-native-reanimated';

export default function MaskElement ({props}) {

    return (
    <Animated.View style={{ backgroundColor: 'transparent', height: '100%'}}>
        <LinearGradient colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF' , '#FFFFFF00']} style={styles.linearGradient}>  
        </LinearGradient>
    </Animated.View>
)}

const styles = StyleSheet.create({
 linearGradient: {
  flex: 1,
  width: '100%',
  //borderRadius: 5
  
 }
});