import React from 'react'
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';



export default function DiscoverScreen({navigation}) {
  return (
   <View style={styles.screen}>
      <Text>Entdecke</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    screen: {
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    }
})