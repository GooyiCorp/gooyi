import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Onboarding from '../screens/root-screens/S-Onboarding';
import Loading from '../screens/root-screens/S-Loading';
import QRScanStackNav from './navigationStack/N-QRScanStack';
import ProfileStackNav from './navigationStack/N-ProfileStack';

import TabNav from './N-TabNav';
import QRCode from '../screens/root-screens/S-QRCode';





//---------------------------------------------------------------------------------------------------------------------

const Root = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function RootNav() {
  return (
    <>
        <Root.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,    
            }}
        >
{/* Screen Onboarding ------------------------------------------------------ */}
            <Root.Screen 
                name='Onboard' 
                component={Onboarding}
            />

{/* Screen Loading --------------------------------------------------------- */}
            <Root.Screen 
                name='Loading' 
                component={Loading}
            />

{/* Screen QR Scan --------------------------------------------------------- */}
            <Root.Screen 
                name='QRScan' 
                component={QRCode}
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                }}
            />

{/* Screen Profile --------------------------------------------------------- */}
            <Root.Screen 
                name='Profile' 
                component={ProfileStackNav}
            />

{/* Screen Discover -------------------------------------------------------- */}
            <Root.Screen 
                name='Main' 
                component={TabNav}
            />

        </Root.Navigator>
    </>
  )
}

const styles = StyleSheet.create({})