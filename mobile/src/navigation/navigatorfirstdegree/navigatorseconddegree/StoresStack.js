import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StoresScreen } from '../../../screens';
import { StorePlaceholder } from '../../../screens/sub-screens/PlaceholderScreen';
import SearchBox from '../../../components/atoms/SearchBox';
import { TopNavButton } from '../../../components/atoms/TopNavButton';
import { height } from '../../../constants/size';


//---------------------------------------------------------------------------------------------------------------------

const StoresStack = createNativeStackNavigator();

//---------------------------------------------------------------------------------------------------------------------

export default function StoresStackNav() {
  return (
    <StoresStack.Navigator>
        <StoresStack.Screen 
            name='Stores1'
            component={StoresScreen}
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
                                {id: 1, title: 'Alle'},
                                {id: 2, title: 'Meine Favoriten'},]} />
                        </ScrollView>
                    </View>
                )
            }}
        />
        <StoresStack.Screen 
            name='Store2'
            component={StorePlaceholder}
        />
    </StoresStack.Navigator>
  )
}

const styles = StyleSheet.create({})