import React from 'react'
import { StyleSheet,View, Text } from 'react-native'


export default function StoresScreen() {
  return (
    <View style={styles.screen}>
      <Text>Stores</Text>
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