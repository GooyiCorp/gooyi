import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DiscoverScreen } from '../../screens'

//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createNativeStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function DiscoverStackNav() {
  return (
    <DiscoverStack.Navigator>
        <DiscoverStack.Screen 
            name='Discover2'
            component={DiscoverScreen}
            // options={{
            //     header: () => (
            //         <Animated.View 
            //             style={{
            //                 height: 55, 
            //                 width: '100%', 
            //                 paddingBottom: 10,
            //                 paddingHorizontal: 30,
            //                 backgroundColor: 'white',
            //                 //justifyContent: 'center',
            //                 alignItems: 'center',
            //                 overflow:'hidden',
            //                 flexDirection: 'row',
            //             }}
            //         >
            //             <SearchBox/>
            //         </Animated.View>
            //     )
            // }}
        />
    </DiscoverStack.Navigator>
  )
}

const styles = StyleSheet.create({})