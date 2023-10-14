import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function BigButton({
    title,
    bgStyle,
    titleStyle,
}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, bgStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        width: width-60,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: COLORS.default,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },

    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15
    }
})