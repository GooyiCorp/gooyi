import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Scanner({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.selector} onPress={ () => navigation.navigate('QRCode') }>
            
          </TouchableOpacity>

        </View>

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
    width: 181,
    //backgroundColor: 'yellow',
    position: 'absolute',
    zIndex: 2,
  }
  
})