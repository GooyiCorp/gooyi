import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'

import Selector from '../../components/atoms/Selector'

export default function QRCode({navigation: {goBack}}) {
  
  const [selectorVal, setSelectorVal] = useState(0);

  return (
    <View style={{flex: 1}}>
        <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

        <View style={styles.cardContainer}>
            <Selector pressValue={selectorVal}/>
            <View style={styles.selector}>
              <TouchableOpacity style={styles.selectorButton} onPress={ () => setSelectorVal(0) }></TouchableOpacity>
              <TouchableOpacity style={styles.selectorButton} onPress={ () => setSelectorVal(1) }></TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <Button title='back' onPress={() => goBack()}/>
            </View>
          
        </View>

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
    width: 180,
    //backgroundColor: 'green'
  },

  contentContainer: {
    height: 488,
    width: 363,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',  
  },
  
})
