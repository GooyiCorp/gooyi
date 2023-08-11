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
                headerStyle: styles.headerStyle,
                headerTitle: '',
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
        <StoresStack.Screen 
            name='Store2'
            component={StorePlaceholder}
        />
    </StoresStack.Navigator>
  )
}

const styles = StyleSheet.create({

    headerStyle: {
        height: 150,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'white'
    },

    headerLeft: {
        width: 350,
        overflow:'hidden',
        flexDirection: 'row',
        //position: 'absolute',
        //top: 70,
        borderBottomWidth: 0,
        marginLeft: 10,
        //backgroundColor: 'red',
        //height: 150,
        
      },

})