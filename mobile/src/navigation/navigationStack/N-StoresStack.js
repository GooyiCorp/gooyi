import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import StoresScreen from '../../screens/root-screens/S-Stores';







//---------------------------------------------------------------------------------------------------------------------

const StoresStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function StoresStackNav() {
    return (
        <>
    
        {/* Nesting Stack Navigator */}
        <StoresStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        
        {/* Nesting Stack Screens */}
          <StoresStack.Screen 
            name='Stores1'
            component={StoresScreen}
          />
    
        </StoresStack.Navigator>
        
        
        </>
    )
}