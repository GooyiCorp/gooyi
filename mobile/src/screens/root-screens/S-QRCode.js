import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import  {default as QR} from 'react-native-qrcode-svg';

import Selector from '../../components/atoms/Selector'
import NavBackButton from '../../components/atoms/NavBackButton'
import { height, width } from '../../constants/size'
import UserID from '../../components/molecules/UserID';
import CodeScanner from '../../components/molecules/CodeScanner';


// ---------------------------------------------------------------------------------------------------------------------   
export default function QRCode({navigation: {goBack}}) {
    const idNumber = Math.random().toString()

    const [pressValue, setPressValue] = useState(0)

    const [showScanner, setShowScanner] = useState(false)
    const [showUserID, setShowUserID] = useState(true)

// ---------------------------------------------------------------------------------------------------------------------    
  return (
    <View style={{flex: 1}}>

      <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>

    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <View style={styles.cardContainer}>

          {/* Selector Tab Bar */}
          <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1}}>
            <Pressable style={styles.selectorButton} onPress={() => {setPressValue(0), setShowScanner(!showScanner), setShowUserID(!showUserID)} }></Pressable>
            <Pressable style={styles.selectorButton} onPress={() => {setPressValue(1), setShowScanner(!showScanner), setShowUserID(!showUserID)}}></Pressable>
          </View>
          <Selector pressValue={pressValue}/>

          {/* Content Container */}
          <UserID setUserID={showUserID}/>
          <CodeScanner setScanner={showScanner}/>
          
          {/* Back Button */}
          <View style={{height: 70, width: 363, position: 'absolute', bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
            <NavBackButton onPressBack={() => goBack()}/>
          </View>

        </View>
    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <Pressable style={{height: height, width: width, position:'absolute'}} onPress={()=> goBack()}></Pressable>
     
      </BlurView>

    </View>

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
    // justifyContent: 'center',
    // alignItems: 'center',  
  },

  userNameStyle: {
    fontFamily: 'Roboto-Medium', 
    fontSize: 28, 
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  qrCodeContainer: {
    height: 252,
    width: 252,
    //backgroundColor: '#eeeeee',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

    id: {
      fontFamily: 'Roboto-Bold',
      fontSize: 15,
      marginLeft: 15,
  }
})
