import { Animated,StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { DiscoverStackNav, CouponsStackNav, FinderStackNav, ProfileStackNav, StoresStackNav } from '../index/stackIndex'
import { ROUTES } from '../index/constantsindex'
import BottomTabNavigation from '../navigation/navigationComponents/BottomTabNavigation'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

//---------------------------------------------------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

//---------------------------------------------------------------------------------------------------------------------

const FadeInView = ( props, { navigation }) => {
    const screenHeight = Dimensions.get('screen').height
    const fadeAnim = React.useRef(new Animated.Value(screenHeight)).current; // Initial value for opacity: 0
   
    useFocusEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      return () => {
        Animated.timing(fadeAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }).start();
      };
    });
  
    return (
      <Animated.View // Special animatable View
        style={{
          flex: 1,
          transform: [{translateY: fadeAnim }]// Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };


  const FadeDiscoverScreen = (props, { navigation }) => (
    <FadeInView>
      <DiscoverStackNav {...props} />
    </FadeInView>
  );

  const FadeCouponsScreen = (props, { navigation }) => (
    <FadeInView>
      <CouponsStackNav {...props} />
    </FadeInView>
  );

  const FadeFinderScreen = (props, { navigation }) => (
    <FadeInView>
      <FinderStackNav {...props} />
    </FadeInView>
  );

  const FadeStoresScreen = (props, { navigation }) => (
    <FadeInView>
      <StoresStackNav {...props} />
    </FadeInView>
  );

//---------------------------------------------------------------------------------------------------------------------

export default function TabNavigator() {
    
    const navigation = useNavigation()
    
    return (
        <>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: "none" },
            }}
        >
            {/* Tab Discover ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootDiscover} 
                component={FadeDiscoverScreen} 
            />

            {/* Tab Coupons ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootCoupons} 
                component={FadeCouponsScreen} 
            />

            {/* Tab Finder ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootFinder} 
                component={FadeFinderScreen} 
            />

            {/* Tab Stores ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootStores} 
                component={FadeStoresScreen} 
            />

            {/* Tab Profile ----------------------------------------------------------------------------- */}
            <Tab.Screen 
                name={ROUTES.RootProfile} 
                component={ProfileStackNav} 
            />

        </Tab.Navigator>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height:100, width: '100%' , backgroundColor: 'red'}}>
                <BottomTabNavigation navigation={navigation}/> 
        </View>
        </>
    )
}
