import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import StoreEntry from '../../screens/store_screens/StoreEntry.js';
import AwardOverview from '../../screens/store_screens/AwardOverview';
import CouponsOverview from '../../screens/store_screens/CouponsOverview';
import QuestOverview from '../../screens/store_screens/QuestOverview';
import SendFeedback from '../../screens/store_screens/SendFeedback';

import StoreInformation from '../../screens/store_screens/StoreInformation';

const StoresStack = createStackNavigator()

export default function StoresStackNav() {
  return (
    <StoresStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >

      <StoresStack.Screen 
        name='StoreEntry'
        component={StoreEntry}
      />

      <StoresStack.Screen 
        name='AwardOverview'
        component={AwardOverview}
      />

      <StoresStack.Screen 
        name='CouponsOverview'
        component={CouponsOverview}
      />

      <StoresStack.Screen 
        name='QuestOverview'
        component={QuestOverview}
      />

      <StoresStack.Screen 
        name='SendFeedback'
        component={SendFeedback}
      />

      <StoresStack.Screen 
        name='StoreInformation'
        component={StoreInformation}
      />

    </StoresStack.Navigator>
  )
}