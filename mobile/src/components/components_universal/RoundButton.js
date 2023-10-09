import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../../helper/scale.js';
import Icons from '../atoms/Icons.js';
import { COLORS } from '../../index/constantsindex.js';

const iconSide = moderateScale(46,0.2)

export default function RoundButton({
    style,
    icon,
    iconName,
    iconSize,
    iconColor,
    iconStyle,
}) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Icons icon={icon} iconName={iconName} iconColor={iconColor} iconSize={iconSize} iconStyle={iconStyle} />
    </View>
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
    }
})