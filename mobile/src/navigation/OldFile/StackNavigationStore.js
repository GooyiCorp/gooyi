import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreDetailsScreen, StoresScreen } from '../screens';
import { ROUTES } from '../constants/index.js';
import SearchBox from '../components/atoms/SearchBox';
import { TopNavButton } from '../components/atoms/TopNavButton';
import { ScrollView } from 'react-native-gesture-handler';
import Header from './navhelperfunction/Header';

const Stack = createNativeStackNavigator();

export default function StackNavigationStore() {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.STORES} component={StoresScreen}
        options={{
          tabBarLabel: 'Stores',
          headerTitle: () => <Header name='Stores'/>,
          tabBarIcon: ({ color }) => (<Entypo name="box" color={color} size={26} />),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <SearchBox/>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                <TopNavButton lists={[
                {id: 1, title: 'Alle'},
                {id: 2, title: 'Favoriten'},]} />
              </ScrollView>
              </View>
          )
          
      }}
        />
        <Stack.Screen name={ROUTES.STOREDETAILS} component={StoreDetailsScreen}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})