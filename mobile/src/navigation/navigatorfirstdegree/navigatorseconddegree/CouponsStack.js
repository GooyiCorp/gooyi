import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CouponsScreen } from '../../../screens';
import SearchBox from '../../../components/atoms/SearchBox';
import { TopNavButton } from '../../../components/atoms/TopNavButton';



//---------------------------------------------------------------------------------------------------------------------

const CouponsStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function CouponsStackNav() {
  return (
    <CouponsStack.Navigator>
        <CouponsStack.Screen 
            name='Coupon2'
            component={CouponsScreen}
            options={{
                header: () => (
                    <View 
                        style={{
                            height: 55, 
                            width: '100%', 
                            backgroundColor: '#ffffff',
                            paddingBottom: 10,
                            paddingHorizontal: 30,
                            //justifyContent: 'center',
                            alignItems: 'center',
                            overflow:'hidden',
                            flexDirection: 'row',
                        }}
                    >
                        <SearchBox/>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                            <TopNavButton lists={[
                                {id: 1, title: 'Merkliste'},
                                {id: 2, title: 'Meine Coupons'},]} />
                        </ScrollView>
                    </View>
                )
            }}
        />
    </CouponsStack.Navigator>
  )
}

const styles = StyleSheet.create({})