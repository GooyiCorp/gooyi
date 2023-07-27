import { StyleSheet,View, Text, Button } from 'react-native'
import React from 'react'

export function Store1({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Store Page 1</Text>
      <Button title='move' onPress={() => navigation.navigate('store2')}/>
    </View>
  )
}
export function Store2() {
  return (
    <View style={styles.screen}>
      <Text>Store Page 2</Text>
      
    </View>
  )
}
export function Store3() {
  return (
    <View style={styles.screen}>
      <Text>Store Page 3</Text>
    </View>
  )
}
export function Store4() {
  return (
    <View style={styles.screen}>
      <Text>Store Page 4</Text>
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