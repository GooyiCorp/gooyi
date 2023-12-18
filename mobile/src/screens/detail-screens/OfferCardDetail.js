import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function OfferCardDetail() {
  return (
    <View style={styles.card}>
        <View style={styles.imageBox}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        padding: 30,
        backgroundColor: COLORS.mainBackground
    },
    imageBox: {
        marginTop: 20,
        height: 0.25*height,
        width: width-60,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
    }
})