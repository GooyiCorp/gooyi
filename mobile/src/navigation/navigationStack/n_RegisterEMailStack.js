import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnterEmail from '../../screens/sub-screens/register_email_screens/EnterEmail'
import CheckEmail from '../../screens/sub-screens/register_email_screens/CheckEmail'
import MultipleLogIn from '../../screens/sub-screens/register_email_screens/MultipleLogIn'


//---------------------------------------------------------------------------------------------------------------------

const RegisterEmailStack = createStackNavigator()

export default function RegisterEMailStack() {
  return (

    <>
        <RegisterEmailStack.Navigator
            initialRouteName='Register1'
            screenOptions={{
                headerShown: false
            }}
        >

            <RegisterEmailStack.Screen
                name='Register1'
                component={EnterEmail}
            />

            <RegisterEmailStack.Screen
                name='CheckEmail'
                component={CheckEmail}
            />

            <RegisterEmailStack.Screen
                name='MultipleLogInError'
                component={MultipleLogIn}
            />

        </RegisterEmailStack.Navigator>
    </>

  )
}

const styles = StyleSheet.create({})