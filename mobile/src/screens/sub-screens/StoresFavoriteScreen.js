import React from 'react'
import { StyleSheet,View, Text } from 'react-native'


export default function StoreFavoriteScreen() {
  return (
    <View style={styles.screen}>
      <Text>Favorite</Text>
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