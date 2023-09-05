import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'

import Selector from '../../components/atoms/Selector'
import NavBackButton from '../../components/atoms/NavBackButton'



// ---------------------------------------------------------------------------------------------------------------------   
export default function QRCode({navigation: {goBack}}) {

    const [pressValue, setPressValue] = useState(0)

// ---------------------------------------------------------------------------------------------------------------------    
  return (
    <View style={{flex: 1}}>
        <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <View style={styles.cardContainer}>

          {/* Selector Tab Bar */}
          <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1}}>
            <TouchableOpacity style={styles.selectorButton} onPress={() => setPressValue(0)}></TouchableOpacity>
            <TouchableOpacity style={styles.selectorButton} onPress={() => setPressValue(1)}></TouchableOpacity>
          </View>
          <Selector pressValue={pressValue}/>

          {/* Content Container */}
          <View style={styles.contentContainer}>

          </View>
          
          {/* Back Button */}
          <View style={{height: 70, width: 363, position: 'absolute', bottom: 0, justifyContent: 'flex-start', alignItems: 'center'}}>
            <NavBackButton onPressBack={() => goBack()}/>
          </View>

        </View>
    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',  
  },
  
})