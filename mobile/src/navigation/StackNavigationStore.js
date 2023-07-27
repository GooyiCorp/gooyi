import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreDetailsScreen, StoresScreen } from '../screens';
import { ROUTES } from '../constants/index.js';

const Stack = createNativeStackNavigator();

export default function StackNavigationStore() {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.STORES} component={StoresScreen}/>
        <Stack.Screen name={ROUTES.STOREDETAILS} component={StoreDetailsScreen}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})