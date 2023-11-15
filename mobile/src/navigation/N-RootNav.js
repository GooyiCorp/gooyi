import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Onboarding from '../screens/root-screens/S-Onboarding';
import Loading from '../screens/root-screens/S-Loading';
import QRScanStackNav from './navigationStack/N-QRScanStack';
import ProfileStackNav from './navigationStack/N-ProfileStack';


import FinderStackNav from './navigationStack/N-FinderStack';
import MainNav from './N-MainNav';
import StoresStackNav from './navigationStack/N-StoresStack';
import RegisterEMailStack from './navigationStack/n_RegisterEMailStack';
import Search from '../screens/root-screens/Search';





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
                options={{
                    gestureEnabled: false,
                }}
            />

{/* Screen Loading --------------------------------------------------------- */}
            <Root.Screen 
                name='Loading' 
                component={Loading}
            />

{/* Screen QR Scan --------------------------------------------------------- */}
            <Root.Screen 
                name='QRScan' 
                component={QRScanStackNav}
                options={{
                    presentation: 'transparentModal',
                }}
            />

{/* Screen Main -------------------------------------------------------- */}
            <Root.Screen 
                name='Main' 
                component={MainNav}
            />

{/* Screen Finder --------------------------------------------------------- */}
            <Root.Screen 
                name='Finder' 
                component={FinderStackNav}
            />

{/* Screen Finder --------------------------------------------------------- */}
            <Root.Screen 
                name='Store' 
                component={StoresStackNav}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='RegisterEmail' 
                component={RegisterEMailStack}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='Profile' 
                component={ProfileStackNav}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='Search' 
                component={Search}
            />
            
        </Root.Navigator>


    </>
  )
}

const styles = StyleSheet.create({})