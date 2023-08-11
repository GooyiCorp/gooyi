import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CouponsScreen } from '../../../screens';



//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav() {
  return (
    <CouponsStack.Navigator>
        <CouponsStack.Screen 
            name='Coupon2'
            component={CouponsScreen}
        />
    </CouponsStack.Navigator>
  )
}

const styles = StyleSheet.create({})