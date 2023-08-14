import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DiscoverScreen } from '../../../screens'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

import GetHeaderTitle from '../../navhelperfunction/HeaderTitle'
import SearchBox from '../../../components/atoms/SearchBox'


//---------------------------------------------------------------------------------------------------------------------

const DiscoverStack = createNativeStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function DiscoverStackNav() {
  return (
    <DiscoverStack.Navigator>
        <DiscoverStack.Screen 
            name='Discover2'
            component={DiscoverScreen}
            options={{
                header: () => (
                    <View 
                        style={{
                            height: 55, 
                            width: '100%', 
                            backgroundColor: '#ffffff',
                            paddingBottom: 10,
                            paddingHorizontal: 30,
                            //justifyContent: 'center',
                            alignItems: 'center',
                            overflow:'hidden',
                            flexDirection: 'row',
                        }}
                    >
                        <SearchBox/>
                    </View>
                )
            }}
        />
    </DiscoverStack.Navigator>
  )
}

const styles = StyleSheet.create({})