import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import QRCode from '../../screens/root-screens/S-QRCode';
import Scanner from '../../screens/root-screens/S-Scanner';








//---------------------------------------------------------------------------------------------------------------------

const QRScanStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function QRScanStackNav() {
    return (
        <>
        
        {/* Nesting Stack Navigator */}
        <QRScanStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        
        {/* Nesting Stack Screens */}
            <QRScanStack.Screen 
                name='QRCode'
                component={QRCode}
                options={{
                    presentation: 'transparentModal',
                }}
            />

            <QRScanStack.Screen 
                name='Scanner'
                component={Scanner}
                options={{
                    presentation: 'transparentModal',
                }}
            />
    
        </QRScanStack.Navigator>
        
        
        </>
    )
}