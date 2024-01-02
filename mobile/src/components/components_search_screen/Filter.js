import { StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { T2 } from '../../constants/text-style'

export default function Filter({
    keyword,
    onPress,
    textStyle,
    bgStyle,
}) {
  return (
    <Pressable style={[styles.button, bgStyle]} onPress={onPress}>
      <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.grey}, textStyle]}>{keyword}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: COLORS.ivoryDark,
        // alignSelf: 'baseline',
        margin: 5,
        borderWidth: 0.5,
    }
})