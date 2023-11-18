import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { T2 } from '../../constants/text-style'

export default function SearchLabel({
    label,
    onPress,
    style,
}) {
  return (
    <Pressable onPress={onPress}>
        <Text style={[T2, styles.box, style]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({

    box: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: COLORS.grey,
        marginLeft: 2,
        color: COLORS.white,
        alignSelf: 'baseline',
        margin: 5
    }
})