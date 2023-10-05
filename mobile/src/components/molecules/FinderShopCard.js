import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FinderShopCard() {
  return (
    <View style={styles.boxContainer}>
        <View style={styles.imgBox}>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    boxContainer: {
        width: 300,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginTop: 15
    },

    imgBox: {
        height: 80,
        width: 80,
        backgroundColor: 'grey',
        borderRadius: 16,
    }
})