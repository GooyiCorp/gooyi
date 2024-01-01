import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux';
// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
// Constant
import { height, width } from '../../constants/size';
// Others
import ScreenOverlay from '../../components/components_universal/ScreenOverlay';
import QueueOverviewModal from '../../components/components_stores_screen/queue/QueueOverviewModal';
import QueueSmall from '../../components/components_stores_screen/queue/QueueSmall';
// Screens / Stacks
import Onboarding from '../../screens/loading-start-screens/S-Onboarding';
import Loading from '../../screens/loading-start-screens/S-Loading';
import QRScanStackNav from '../navigationStack/N-QRScanStack';
import ProfileStackNav from '../navigationStack/N-ProfileStack';
import FinderStackNav from '../navigationStack/N-FinderStack';
import MainNav from './N-MainNav';
import StoresStackNav from '../navigationStack/N-StoresStack';
import RegisterEMailStack from '../navigationStack/n_RegisterEMailStack';
import Search from '../../screens/search-screens/Search';
import ShowAllOffers from '../../screens/showmore_screens/ShowAllOffers';
import OfferCardDetail from '../../screens/detail-screens/OfferCardDetail';
import CouponCardDetail from '../../screens/detail-screens/CouponCardDetail';
import CitySelection from '../../screens/locate_screens/CitySelection';
import EnterPosition from '../../screens/locate_screens/EnterPosition';
import SendAsGift from '../../screens/cart-screens/SendAsGift';

// --- Create Stack Navigator
const Root = createStackNavigator();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function RootNav() {

// Redux
const dispatch = useDispatch()
const showQueueSmall = useSelector((state) => state.queue.showQueueSmall)


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={{height: height, width: width, justifyContent: 'center'}}>

    <QueueOverviewModal />
    <ScreenOverlay queueOverview delay={0}/>

    {/* ---- start - Navigation Section */}
    <Root.Navigator
        initialRouteName='Main'
        screenOptions={{
            headerShown: false,    
        }}
    >
        
        {/* ----------------------------- Main Screens */}
        {/* Main Navigation*/}
        <Root.Screen 
            name='Main' 
            component={MainNav}
        />
        {/* QR Scan / QR Code */}
        <Root.Screen 
            name='QRScan' 
            component={QRScanStackNav}
            options={{
                presentation: 'transparentModal',
            }}
        />    
        {/* Finder */}
        <Root.Screen 
            name='Finder' 
            component={FinderStackNav}
        />
        {/* Store Stack */}
        <Root.Screen 
            name='Store' 
            component={StoresStackNav}
        />
        {/* Register Stack */}
        <Root.Screen 
            name='RegisterEmail' 
            component={RegisterEMailStack}
        />
        {/* Profile Stack */}
        <Root.Screen 
            name='Profile' 
            component={ProfileStackNav}
        />

        {/* ----------------------------- Functional Screens */}
        {/* Search */}
        <Root.Screen 
            name='Search' 
            component={Search}
        />

        {/* ----------------------------- Locate Screens */}
        {/* Enter Position */}
        <Root.Screen 
            name='EnterPosition' 
            component={EnterPosition}
        />
        {/* City Selection */}
        <Root.Screen 
            name='SelectCity' 
            component={CitySelection}
        />

        {/* ----------------------------- Show All Screens */}
        {/* Show All Offers */}
        <Root.Screen 
            name='ShowAllOffers' 
            component={ShowAllOffers}
        />

        {/* Show Detail Screens */}
        <Root.Screen 
            name='OfferCardDetail' 
            component={OfferCardDetail}
        />

        <Root.Screen 
            name='CouponCardDetail' 
            component={CouponCardDetail}
        />
        
        {/* ----------------------------- Other Screens */}
        <Root.Screen 
            name='Onboard' 
            component={Onboarding}
            options={{
                gestureEnabled: false,
            }}
        />
        <Root.Screen 
            name='Loading' 
            component={Loading}
        />

        {/* ----------------------------- Cart Screens */}
        {/* Send As Gift */}
        <Root.Screen 
            name='SendAsGift' 
            component={SendAsGift}
        />

    </Root.Navigator>
    {/* ---- end - Navigation Section */}

    {showQueueSmall && <QueueSmall />}

</View>
)
}

const styles = StyleSheet.create({})