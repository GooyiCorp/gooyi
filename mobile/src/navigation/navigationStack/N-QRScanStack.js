import React, { useState } from 'react'
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import QRCode from '../../screens/qr-scanner-screens/QRCode';
import Scanner from '../../screens/qr-scanner-screens/Scanner';

import NavBackButton from '../../components/components_qrscan_screen/NavBackButton';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../../constants/size';
import { moderateScale } from '../../helper/scale';
import Selector from '../../components/components_qrscan_screen/Selector';


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
            <View style={{height: moderateScale(70,1), width: moderateScale(363,1), position: 'absolute', bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
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
      width: moderateScale(363,1), 
      height: moderateScale(536,1), 
      backgroundColor: '#B84058', 
      borderRadius: 16,
      overflow: 'hidden',
      zIndex: 1

    },
  
    // selector: {
    //   height: 48,
    //   width: 363,
    //   backgroundColor: 'yellow',
    //   position: 'absolute',
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   zIndex: 1,
    // },
  
    selectorButton: {
      height: moderateScale(48,0),
      width: moderateScale(181.5,1),
    //   backgroundColor: 'green',
    //   opacity: 0.5,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    },
  
    contentContainer: {
      height: moderateScale(488,1),
      width: moderateScale(363,1),
      backgroundColor: 'green',
    },
  
  })
  