import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { height, width } from '../helper/constants/size';
import ScannerScreen from '../screens/main/scanner/ScannerScreen';
import ScannerHeader from '../components/components_Scanner/ScannerHeader';
import CodeInputScreen from '../screens/main/scanner/CodeInputScreen';
import ManageQuickSelection from '../screens/main/scanner/ManageQuickSelection';

// --- Create Stack Navigator
const Scanner = createStackNavigator();
export default function ScannerScreenStack() {
  return (
    <View style={{height: height, width: width}}>

        <ScannerHeader />

        {/* ---- start - Navigation Section */}
        <Scanner.Navigator
            initialRouteName='ScannerScreen'
            screenOptions={{
                headerShown: false,    
            }}
        >

            {/* ---- start - Create Screen Section */}
            <Scanner.Screen 
                name='ScannerScreen'
                component={ScannerScreen}
            />

            <Scanner.Screen 
                name='CodeInput'
                component={CodeInputScreen}
            />

            <Scanner.Screen 
                name='ManageQuickSelection'
                component={ManageQuickSelection}
            />
            {/* ---- end - Create Screen Section */}

        </Scanner.Navigator>
        {/* ---- end - Navigation Section */}
    </View>
  )
}

const styles = StyleSheet.create({})