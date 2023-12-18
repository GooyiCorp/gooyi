import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnterEmail from '../../screens/register-screens/register_email_screens/EnterEmail'
import CheckEmail from '../../screens/register-screens/register_email_screens/CheckEmail'
import EnterUserInformation from '../../screens/register-screens/register_email_screens/EnterUserInformation'


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
                name='EnterUserInformation'
                component={EnterUserInformation}
            />

        </RegisterEmailStack.Navigator>
    </>

  )
}

const styles = StyleSheet.create({})