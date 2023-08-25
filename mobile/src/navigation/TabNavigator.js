import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { DiscoverStackNav, CouponsStackNav, FinderStackNav, ProfileStackNav, StoresStackNav } from '../index/stackIndex'
import { ROUTES } from '../index/constantsindex'
import BottomTabNavigation from '../navigation/navigationComponents/BottomTabNavigation'
import Animated,{ useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {width, height} from '../constants/size'
//---------------------------------------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

//---------------------------------------------------------------------------------------------------------------------

// const FadeInView = ( props, { navigation }) => {
//     const screenHeight = height
//     const fade = useSharedValue(screenHeight)
//     const x = props.index < 2 ? -width/2 + props.index*width/4 : props.index*width/4
//     const translateX = useSharedValue(x)
//     const scale = useSharedValue(0)
//     const radius = useSharedValue(200)
//     useFocusEffect(() => {
//       fade.value = withTiming(0, {duration: 500})
//       translateX.value = withTiming(0, {duration: 500})
//       scale.value = withTiming(1, {duration: 600})
//       radius.value = withTiming(0, {duration: 1000})
//       return () => {
//         fade.value = withTiming(screenHeight, {duration: 500})
//         translateX.value = withTiming(x, {duration: 500})
//         scale.value = withTiming(0, {duration: 600})
//         radius.value = withTiming(200, {duration: 1000})
//       };
//     });
//     const style = useAnimatedStyle(() => {
//       return {
//         transform: [
//           {translateY: fade.value},
//           {translateX: translateX.value},
//           {scale: scale.value}
//         ],
//         borderTopRightRadius: radius.value,
//         borderTopLeftRadius: radius.value
//       }
//     })
//     return (
//       <Animated.View // Special animatable View
//         // style={{
//         //   flex: 1,
//         //   transform: [{translateY: fadeAnim }]// Bind opacity to animated value
//         // }}
//       style={[{
//         flex: 1,
//         overflow: 'hidden'
//         },style]}
//       >
//         {props.children}
//       </Animated.View>
//     );
//   };


//   const FadeDiscoverScreen = (props, { navigation }) => (
//     <FadeInView index={0}>
//       <DiscoverStackNav {...props} />
//     </FadeInView>
//   );

//   const FadeCouponsScreen = (props, { navigation }) => (
//     <FadeInView index={1}>
//       <CouponsStackNav {...props} />
//     </FadeInView>
//   );

//   const FadeFinderScreen = (props, { navigation }) => (
//     <FadeInView index={2}>
//       <FinderStackNav {...props} />
//     </FadeInView>
//   );

//   const FadeStoresScreen = (props, { navigation }) => (
//     <FadeInView index={3}>
//       <StoresStackNav {...props} />
//     </FadeInView>
//   );

//---------------------------------------------------------------------------------------------------------------------

export default function TabNavigator() {
    
    const navigation = useNavigation()
  
    return (
        <>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: "none" },
                screenOptions: {
                  
                }

            }}
        >
            {/* Tab Discover ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootDiscover} 
                component={DiscoverStackNav} 
            />

            {/* Tab Coupons ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootCoupons} 
                component={CouponsStackNav} 
            />

            {/* Tab Finder ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootFinder} 
                component={FinderStackNav} 
            />

            {/* Tab Stores ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootStores} 
                component={StoresStackNav} 
            />

            {/* Tab Profile ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootProfile} 
                component={ProfileStackNav} 
            />

        </Tab.Navigator>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height:100, width: '100%' , backgroundColor: 'red'}}>
                <BottomTabNavigation navigation={navigation} /> 
        </View>
        </>
    )
}
