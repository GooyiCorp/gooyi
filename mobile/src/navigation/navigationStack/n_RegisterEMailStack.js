import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnterEmail from '../../screens/sub-screens/register_email_screens/EnterEmail'


//---------------------------------------------------------------------------------------------------------------------

const RegisterEmailStack = createStackNavigator()

export default function RegisterEMailStack() {
  return (

    <>
        <RegisterEmailStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <RegisterEmailStack.Screen
                name='Register1'
                component={EnterEmail}
            />

        </RegisterEmailStack.Navigator>
    </>

  )
}

const styles = StyleSheet.create({})