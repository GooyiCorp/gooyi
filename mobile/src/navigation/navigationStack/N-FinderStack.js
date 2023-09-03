import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import FinderScreen from '../../screens/root-screens/S-Finder';







//---------------------------------------------------------------------------------------------------------------------

const FinderStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function FinderStackNav() {
    return (
        <>
    
        {/* Nesting Stack Navigator */}
        <FinderStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        
        {/* Nesting Stack Screens */}
          <FinderStack.Screen 
            name='Finder1'
            component={FinderScreen}
          />
    
        </FinderStack.Navigator>
        
        
        </>
    )
}