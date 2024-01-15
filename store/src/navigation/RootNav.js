import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Helpers
import { height, width } from '../helper/constants/size';
// Screens
import LoadingScreen from '../screens/loading/LoadingScreen';
import LogInScreen from '../screens/logIn/LogInScreen';


// --- Create Stack Navigator
const Root = createStackNavigator();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function RootNav() {

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>
    {/* ---- start - Navigation Section */}
    <Root.Navigator
        initialRouteName='LogIn'
        screenOptions={{
            headerShown: false,    
        }}
    >

        {/* Loading Screen */}
        <Root.Screen 
            name='Loading'
            component={LoadingScreen}
        />
        {/* LogIn Screen */}
        <Root.Screen 
            name='LogIn'
            component={LogInScreen}
        />



    </Root.Navigator>
    {/* ---- end - Navigation Section */}
</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    
    screen: {
        height: height,
        width: width,
    },

})