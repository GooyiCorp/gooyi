import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BonusImageCard() {
  return (
    <View style={styles.cardContainer}>
      <Text>BonusImageCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 204,
        width: 323,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        margin: 10,
    }
})