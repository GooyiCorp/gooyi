import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { height, width } from '../helper/constants/size';
import PointsHistoryScreen from '../screens/main/history/PointsHistoryScreen';
import HistoryHeader from '../components/components_History/HistoryHeader';


// --- Create Stack Navigator
const History = createStackNavigator();
export default function HistoryScreenStack() {
  return (
    <View style={{height: height, width: width}}>
        
        <HistoryHeader />

        {/* ---- start - Navigation Section */}
        <History.Navigator
            initialRouteName='ManageStore'
            screenOptions={{
                headerShown: false,    
            }}
        >

            {/* ---- start - Create Screen Section */}
            <History.Screen 
                name='PointsHistory'
                component={PointsHistoryScreen}
            />
            {/* ---- end - Create Screen Section */}

        </History.Navigator>
        {/* ---- end - Navigation Section */}
    </View>
  )
}

const styles = StyleSheet.create({})