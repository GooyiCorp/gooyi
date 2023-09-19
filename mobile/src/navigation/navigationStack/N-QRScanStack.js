import React, { useState } from 'react'
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import QRCode from '../../screens/root-screens/S-QRCode';
import Scanner from '../../screens/root-screens/S-Scanner';

import Selector from '../../components/atoms/Selector';
import NavBackButton from '../../components/atoms/NavBackButton';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../../constants/size';


//---------------------------------------------------------------------------------------------------------------------

const QRScanStack = createStackNavigator()

//---------------------------------------------------------------------------------------------------------------------

export default function QRScanStackNav({navigation: {goBack}}) {

    const navigation = useNavigation()
    const [pressValue, setPressValue] = useState(0)

    return (
        <>
        <View style={{flex: 1}}>
        <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <Pressable style={{height: height, width: width, position: 'absolute'}} onPress={() => goBack()}></Pressable>
        <View style={styles.cardContainer}>

            {/* Selector Tab Bar */}
            <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1}}>
                <Pressable style={styles.selectorButton} onPress={() => (setPressValue(0), navigation.navigate('QRCode') )}></Pressable>
                <Pressable style={styles.selectorButton} onPress={() => (setPressValue(1), navigation.navigate('Scanner') )}></Pressable>
            </View>
            <Selector pressValue={pressValue}/>

        <View style={styles.contentContainer}>

        {/* --------------------------------------------------------------------------------------------------------------------- */}

        {/* Nesting Stack Navigator */}
        <QRScanStack.Navigator
            initialRouteName='QRCode'
            screenOptions={{
                headerShown: false
            }}
        >
        
        {/* Nesting Stack Screens */}
            <QRScanStack.Screen 
                name='QRCode'
                component={QRCode}
                options={{
                    presentation: 'transparentModal',
                }}
            />

            <QRScanStack.Screen 
                name='Scanner'
                component={Scanner}
                options={{
                    presentation: 'transparentModal',
                }}
            />
    
        </QRScanStack.Navigator>

        {/* --------------------------------------------------------------------------------------------------------------------- */}
        
        </View>

            {/* Back Button */}
            <View style={{height: 70, width: 363, position: 'absolute', bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
                <NavBackButton onPressBack={() => goBack()}/>
            </View>

        </View>

        
        </BlurView>
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
  
    cardContainer: {
      width: 363, 
      height: 536, 
      backgroundColor: '#B84058', 
      borderRadius: 16,
      overflow: 'hidden',
      zIndex: 1

    },
  
    selector: {
      height: 48,
      width: 363,
      //backgroundColor: 'yellow',
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1,
    },
  
    selectorButton: {
      height: 48,
      width: 181.5,
      //backgroundColor: 'green',
      opacity: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    contentContainer: {
      height: 488,
      width: 363,
      backgroundColor: '#ffffff',
    },
  
  })
  