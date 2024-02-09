import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { T2 } from '../../../helper/constants/text'
import { COLORS } from '../../../helper/constants/colors'

export default function KeyButton({
    keyWords,
    onPress,
    styleContainer,
    styleText,
}) {
  return (
    <TouchableOpacity style={[styles.button, styleContainer]} onPress={onPress}>
        <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.grey}, styleText]}>{keyWords}</Text>
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