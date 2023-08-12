import React from 'react'
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import HeaderNavigation from '../../navigation/headercomponents/HeaderNavigation';



export default function DiscoverScreen({navigation}) {
  return (
   <View style={styles.screen}>
      <Text>Entdecke</Text>
      <HeaderNavigation/>
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