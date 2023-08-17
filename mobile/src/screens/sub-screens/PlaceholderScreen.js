import { StyleSheet,View, Text, Button } from 'react-native'
import React from 'react'


export function Store2() {
  return (
    <View style={styles.screen}>
      <Text>Store Page 2</Text>
      
    </View>
  )
}
export function ProfilePlaceholder({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Profile Placeholder</Text>
    </View>
  )
}
export function StorePlaceholder({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Store Placeholder</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})