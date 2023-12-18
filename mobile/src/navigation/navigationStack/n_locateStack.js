import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import EnterPosition from '../../screens/locate_screens/EnterPosition'
import CitySelection from '../../screens/locate_screens/CitySelection'

export default function LocateStack() {
    const locate = createStackNavigator()
  return (
    <locate.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <locate.Screen 
            name='EnterPosition'
            component={EnterPosition}
        /> 

        <locate.Screen 
            name='CitySelection'
            component={CitySelection}
        /> 
    </locate.Navigator>
  )
}

const styles = StyleSheet.create({})