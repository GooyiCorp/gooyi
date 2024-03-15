import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { height, width } from '../helper/constants/size';
import ManagementHeader from '../components/components_Manage/ManagementHeader';
import ManageStoreScreen from '../screens/main/manage/ManageStoreScreen';
import ManageTeamScreen from '../screens/main/manage/ManageTeamScreen';
import MemberOverview from '../screens/main/manage/MemberOverview';

// --- Create Stack Navigator
const Manage = createStackNavigator();

export default function ManageScreenStack() {
return (
    <View style={{height: height, width: width}}>

        <ManagementHeader />

        {/* ---- start - Navigation Section */}
        <Manage.Navigator
            initialRouteName='ManageStore'
            screenOptions={{
                headerShown: false,    
            }}
        >

            {/* ---- start - Create Screen Section */}
            <Manage.Screen 
                name='ManageStore'
                component={ManageStoreScreen}
            />
            <Manage.Screen 
                name='ManageTeam'
                component={ManageTeamScreen}
                options={{
                    gestureEnabled: false
                }}
            />
            {/* ---- end - Create Screen Section */}

        </Manage.Navigator>
        {/* ---- end - Navigation Section */}
    </View>
)
}

const styles = StyleSheet.create({})