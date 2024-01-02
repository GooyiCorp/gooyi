import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'

export default function OfferOrderCard() {
  return (
    <View style={styles.cardStyle}>
      <Text>OfferOrderCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    cardStyle: {
        width: '100%',
        height: 60,
        backgroundColor: COLORS.mainBackground,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
})