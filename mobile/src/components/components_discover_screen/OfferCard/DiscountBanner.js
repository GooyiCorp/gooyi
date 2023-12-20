import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { T1, T2 } from '../../../constants/text-style'

export default function DiscountBanner({
    price,
    discountPrice,
}) {

    const discountPercentage = 100-((discountPrice/price)*100)
  return (
    <View style={styles.container}>
      <Text style={[T2, styles.text]}>Spare {Math.floor(discountPercentage)}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    text: {
        color: COLORS.white,
        fontFamily: 'RH-Medium'
    }
})