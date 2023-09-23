import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CatergorySelectorIcons({
    number
}) {
  return (
    <View style={styles.box}>
      <Text>{number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        height: 42,
        width: 42,
        backgroundColor: 'grey',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})