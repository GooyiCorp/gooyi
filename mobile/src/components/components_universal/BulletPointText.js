import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { T2 } from '../../constants/text-style'
import { COLORS } from '../../index/constantsindex'

export default function BulletPointText({
    customBulletPointStyle,
    text
}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={[styles.bulletPoint, customBulletPointStyle]}></View>
        <Text style={T2}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    bulletPoint: {
        width: 6,
        height: 6, 
        backgroundColor: COLORS.grey, 
        borderRadius: 10,
        marginRight: 8
    }
})