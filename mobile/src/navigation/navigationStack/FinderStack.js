import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FinderScreen } from '../../screens';




//---------------------------------------------------------------------------------------------------------------------

const FinderStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function FinderStackNav() {
  return (
    <FinderStack.Navigator>
        <FinderStack.Screen 
            name='Finder2'
            component={FinderScreen}
        />
    </FinderStack.Navigator>
  )
}

const styles = StyleSheet.create({})