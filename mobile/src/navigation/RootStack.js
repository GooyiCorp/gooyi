import React from 'react'
import { Animated, Button, View, Easing } from 'react-native'

import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'

import { QRCodeScreen } from '../index/screenIndex'


import { ROUTES } from '../index/constantsindex'
import TabNavigator from './TabNavigator'


//---------------------------------------------------------------------------------------------------------------------

const RootStack = createStackNavigator();

// Screen Transition ---------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >

    {/* Root Tab ----------------------------------------------------------------------------- */}
        <RootStack.Screen 
            name={ROUTES.RootTabNavigator}
            component={TabNavigator}
        />

    {/* Root QR ----------------------------------------------------------------------------- */}
        <RootStack.Screen
            name={ROUTES.RootQR}
            component={QRCodeScreen}
            options={{
                presentation: 'transparentModal',
                animation: 'fade',
            }}
        />  

    </RootStack.Navigator>
  )
}


// const customTransition = {
//     gestureEnabled: true,
//     gestureDirection: 'horizontal',
//     transitionSpec: {
//       open: TransitionSpecs.TransitionIOSSpec,
//       close: none
//     },
//     cardStyleInterpolator: ({ current, next, layouts }) => {
//       return {
//         cardStyle: {

//           transform: [
//             {
//               translateY: current.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [layouts.screen.height, 0],
//               })
//             },
//             {
//                 scale: current.progress.interpolate({
//                   inputRange: [0, 0.8, 1],
//                   outputRange: [0, 1.1, 1],
//                 })
//               },
//             {
//               scale: next ?
//                 next.progress.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [1, 0.8],
//                 }) : 1,
//             }
//           ]
//         },
//         opacity: current.opacity,
        
//       }
//     }
//   }





// const customTransition = {
//   gestureEnabled: true,
//   gestureDirection: 'horizontal',
//   transitionSpec: {
//     open: TransitionSpecs.TransitionIOSSpec,
//     close: TransitionSpecs.TransitionIOSSpec,
//   },
//   cardStyleInterpolator: ({ current, next, layouts }) => {
//     return {
//       cardStyle: {

//         transform: [
//           {
//             translateY: current.progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: [layouts.screen.height, 0],
//             })
//           },

//         ]
//       },
//       opacity: current.opacity,
      
//     }
//   }
// }