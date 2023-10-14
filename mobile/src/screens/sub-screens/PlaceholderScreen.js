import { StyleSheet,View, Text, Button } from 'react-native'
import React from 'react'
import { CommonActions } from '@react-navigation/native'


export function Store2() {
  return (
    <View style={styles.screen}>
      <Text>Store Page 2</Text>
      
    </View>
  )
}
export function Test2({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Test 2</Text>
      <Button onPress={() => navigation.dispatch(CommonActions.navigate('Main'))} title='return'></Button>
    </View>
  )
}
export function Test1({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Test 1</Text>
      <Button onPress={() => navigation.dispatch(CommonActions.goBack)} title='return'></Button>
      <Button onPress={() => navigation.dispatch(CommonActions.navigate('Test2'))} title='move next'></Button>
    </View>
  )
}
export function Test4({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Test 4</Text>
    </View>
  )
}
export function Test3({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Test 3</Text>
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