import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DiscoverScreen } from '../../screens/index.js';
import { ROUTES } from '../../constants/index.js';
import Header from '../navhelperfunction/Header.js';

const Stack = createNativeStackNavigator();

export default function DiscoverStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerStyle: styles.header 
    }}
    >
        <Stack.Screen 
            name={ROUTES.DISCOVER} 
            component={DiscoverScreen}
            options={{
                headerTitle: '',
                headerLeft: () => (
                    <View style={styles.headerLeft}>
                        <Text>{<Header name='Entdecken'/>}</Text>
                    </View>
                  )
                  
              
                
            }}
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        position:'absolute',
        backgroundColor: 'blue'
    },
    headerLeft: {
        marginLeft: 10,
        backgroundColor: 'red',
    }
})