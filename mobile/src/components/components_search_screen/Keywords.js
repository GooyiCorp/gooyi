import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { T2 } from '../../constants/text-style'

export default function Keywords({
    keyword,
    onPress,
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{keyword}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: COLORS.ivoryDark,
        alignSelf: 'baseline',
        margin: 5,
    }
})