import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../../helper/scale.js';
import Icons from '../atoms/Icons.js'
import { COLORS } from '../../index/constantsindex.js';

const iconSide = moderateScale(44,0.2)

export default function RoundButton({
    style,
    icon,
    iconName,
    iconSize,
    iconColor,
    iconStyle,
    onPressButton,
    activeOpacity,
}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPressButton} activeOpacity={activeOpacity}>
      <Icons icon={icon} iconName={iconName} iconColor={iconColor} iconSize={iconSize} iconStyle={iconStyle} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: iconSide,
        width: iconSide,
        backgroundColor: COLORS.default,
        borderRadius: iconSide/2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    }
})