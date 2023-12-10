import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Onboarding from '../../screens/root-screens/S-Onboarding';
import Loading from '../../screens/root-screens/S-Loading';
import QRScanStackNav from '../navigationStack/N-QRScanStack';
import ProfileStackNav from '../navigationStack/N-ProfileStack';


import FinderStackNav from '../navigationStack/N-FinderStack';
import MainNav from './N-MainNav';
import StoresStackNav from '../navigationStack/N-StoresStack';
import RegisterEMailStack from '../navigationStack/n_RegisterEMailStack';
import Search from '../../screens/root-screens/Search';
import LocateStack from '../navigationStack/n_locateStack';
import QueueModal from '../../components/components_stores_screen/queue/queueModal';
import CustomAlert from '../../components/components_stores_screen/queue/QueueAlert';
import { useDispatch, useSelector } from 'react-redux';
import { setHideQueueAlert } from '../../redux/slices/queueSlice';
import ScreenOverlay from '../../components/components_universal/ScreenOverlay';
import QueueAlert from '../../components/components_stores_screen/queue/QueueAlert';
import { height, width } from '../../constants/size';
import QueueSmall from '../../components/components_stores_screen/queue/QueueSmall';
import QueueOverviewModal from '../../components/components_stores_screen/queue/QueueOverviewModal';





//---------------------------------------------------------------------------------------------------------------------

const Root = createStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function RootNav() {
    const dispatch = useDispatch()
    const showQueueSmall = useSelector((state) => state.queue.showQueueSmall)
  return (
    <View style={{height: height, width: width, justifyContent: 'center'}}>
    <QueueOverviewModal />
    <ScreenOverlay queueOverview delay={0}/>

        <Root.Navigator
            initialRouteName='Loading'
            screenOptions={{
                headerShown: false,    
            }}
        >
{/* Screen Onboarding ------------------------------------------------------ */}
            <Root.Screen 
                name='Onboard' 
                component={Onboarding}
                options={{
                    gestureEnabled: false,
                }}
            />

{/* Screen Loading --------------------------------------------------------- */}
            <Root.Screen 
                name='Loading' 
                component={Loading}
            />

{/* Screen QR Scan --------------------------------------------------------- */}
            <Root.Screen 
                name='QRScan' 
                component={QRScanStackNav}
                options={{
                    presentation: 'transparentModal',
                }}
            />

{/* Screen Main -------------------------------------------------------- */}
            <Root.Screen 
                name='Main' 
                component={MainNav}
            />

{/* Screen Finder --------------------------------------------------------- */}
            <Root.Screen 
                name='Finder' 
                component={FinderStackNav}
            />

{/* Screen Finder --------------------------------------------------------- */}
            <Root.Screen 
                name='Store' 
                component={StoresStackNav}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='RegisterEmail' 
                component={RegisterEMailStack}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='Profile' 
                component={ProfileStackNav}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='Search' 
                component={Search}
            />

{/* Screen Register Email --------------------------------------------------------- */}
            <Root.Screen 
                name='Locate' 
                component={LocateStack}
            />
            
        </Root.Navigator>
        
        {showQueueSmall && <QueueSmall />}

    </View>
  )
}

const styles = StyleSheet.create({})