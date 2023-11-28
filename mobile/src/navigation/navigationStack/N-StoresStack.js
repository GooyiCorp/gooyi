import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import StoresScreen from '../../screens/root-screens/S-Stores';
import StoreEntry from '../../screens/sub-screens/store_screens/StoreEntry';
import MainHeader from '../navigationComponents/MainHeader';
import SubHeader from '../navigationComponents/SubHeader';
import { View } from 'react-native';
import { width } from '../../constants/size';
import StoreNav from '../navigationComponents/StoreNav';







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
            name='StoreEntry'
            component={StoreEntry}
          />
    
        </StoresStack.Navigator>
        
        
        </>
    )
}