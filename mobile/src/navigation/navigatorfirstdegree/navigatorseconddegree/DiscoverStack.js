import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DiscoverScreen } from '../../../screens'

import GetHeaderTitle from '../../navhelperfunction/HeaderTitle'


//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createNativeStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function DiscoverStackNav() {
  return (
    <DiscoverStack.Navigator>
        <DiscoverStack.Screen 
            name='Discover2'
            component={DiscoverScreen}
        />
    </DiscoverStack.Navigator>
  )
}

const styles = StyleSheet.create({})