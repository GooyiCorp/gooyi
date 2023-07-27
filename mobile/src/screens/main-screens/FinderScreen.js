import React from 'react'
import { StyleSheet,View, Text } from 'react-native'


export default function FinderScreen() {
  return (
    <View style={styles.screen}>
      <Text>Finder</Text>
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