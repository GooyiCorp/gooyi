import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'

export default function PointIcon({
    style,
    textStyle,
}) {
  return (
    <View style={[styles.point, style]}>
        <Text style={[styles.text, textStyle]}>G</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    point: {
        height: 18,
        width: 18,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 0.5,
    },

    text: {
        color: COLORS.white,
        fontFamily: 'RH-Bold',
        fontSize: 12,
    }
})