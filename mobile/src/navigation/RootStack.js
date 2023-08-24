import React from 'react'
import { Animated, Button, View, Easing } from 'react-native'

import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'

import { QRCodeScreen } from '../index/screenIndex'


import { ROUTES } from '../index/constantsindex'
import { DiscoverStackNav, CouponsStackNav, FinderStackNav, ProfileStackNav, StoresStackNav } from '../index/stackIndex'
import BottomTabNavigation from '../navigation/navigationComponents/BottomTabNavigation'
import { useNavigation, useFocusEffect } from '@react-navigation/native'


//---------------------------------------------------------------------------------------------------------------------

const RootStack = createStackNavigator();

// Screen Transition ---------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------

export default function RootStackNavigator() {
    const navigation = useNavigation()
  return (
    <>
    <RootStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
            {/* Tab Discover ----------------------------------------------------------------------------- */}
            <RootStack.Screen 
                name={ROUTES.RootDiscover} 
                component={DiscoverStackNav} 
                options={{
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            />

            {/* Tab Coupons ----------------------------------------------------------------------------- */}
            <RootStack.Screen 
                name={ROUTES.RootCoupons} 
                component={CouponsStackNav}
                options={{
                    presentation: 'transparentModal',
                    animation: 'none',
                }} 
            />

            {/* Tab Finder ----------------------------------------------------------------------------- */}
            <RootStack.Screen 
                name={ROUTES.RootFinder} 
                component={FinderStackNav} 
                options={{
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            />

            {/* Tab Stores ----------------------------------------------------------------------------- */}
            <RootStack.Screen 
                name={ROUTES.RootStores} 
                component={StoresStackNav} 
                options={{
                    presentation: 'transparentModal',
                    animation: 'none',
                }}
            />

            {/* Tab Profile ----------------------------------------------------------------------------- */}
            <RootStack.Screen 
                name={ROUTES.RootProfile} 
                component={ProfileStackNav} 
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

<View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height:100, width: '100%' , backgroundColor: 'red'}}>
        <BottomTabNavigation navigation={navigation} /> 
</View>
</>
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