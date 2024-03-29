import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
// Helpers
import { height, width } from '../helper/constants/size';
// Screens
import LoadingScreen from '../screens/loading/LoadingScreen';
import LogInScreen from '../screens/logIn/LogInScreen';
import ChangePasswordScreen from '../screens/logIn/ChangePasswordScreen';
import ResetPasswordScreen from '../screens/logIn/ResetPasswordScreen';
import MainNav from './MainNav';
import RedeemScreen from '../screens/main/redeem/RedeemScreen';
import CreateNewCouponScreen from '../screens/main/coupons/CreateNewCouponScreen';
import MemberOverview from '../screens/main/manage/MemberOverview';
import PointsEntryScreen from '../screens/main/scanner/PointsEntryScreen';
import ScoringScreenStack from './ScoringScreenStack';
import ManageCoupons from '../screens/main/manage/ManageCoupons';
import ManageReward from '../screens/main/manage/ManageReward';
import ManageDeals from '../screens/main/manage/ManageDeals';
import ManageQuest from '../screens/main/manage/ManageQuest';


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
        initialRouteName='Main'
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
        {/* Change Password Screen */}
        <Root.Screen 
            name='ChangePassword'
            component={ChangePasswordScreen}
        />
        {/* Reset Password Screen */}
        <Root.Screen 
            name='ResetPassword'
            component={ResetPasswordScreen}
        />

        <Root.Screen 
            name='Main'
            component={MainNav}
        />

        <Root.Screen 
            name='Redeem'
            component={RedeemScreen}
        />

        <Root.Screen 
            name='CreateCoupon'
            component={CreateNewCouponScreen}
        />

        <Root.Screen 
            name='MemberOverview'
            component={MemberOverview}
            options={{
                presentation: 'modal'
            }}
        />

        <Root.Screen 
            name='Scoring'
            component={ScoringScreenStack}
        />

        <Root.Screen 
            name='ManageCoupons'
            component={ManageCoupons}
        />
        <Root.Screen 
            name='ManageReward'
            component={ManageReward}
        />
        <Root.Screen 
            name='ManageDeals'
            component={ManageDeals}
        />
        <Root.Screen 
            name='ManageQuest'
            component={ManageQuest}
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