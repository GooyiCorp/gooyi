import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function BigButton({
    title,
    bgStyle,
    titleStyle,
    onPress,
}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, bgStyle]} onPress={onPress}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        width: width-60,
        alignSelf: 'center',
        borderRadius: 16,
        backgroundColor: COLORS.default,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },

    title: {
        fontFamily: 'RH-Medium',
        fontSize: 15
    }
})