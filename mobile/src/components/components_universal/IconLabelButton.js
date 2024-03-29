import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../../helper/scale.js';
import Icons from './Icons.js'
import { COLORS } from '../../index/constantsindex.js';
import { T2 } from '../../constants/text-style.js';

const iconSide = moderateScale(38,0.2)

export default function IconLabelButton({
    style,
    icon,
    iconName,
    iconSize,
    iconColor,
    iconStyle,
    onPressButton,
    activeOpacity,
    label,
    labelStyle,
    innerContainerStyle,
}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPressButton} activeOpacity={activeOpacity}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}, innerContainerStyle]}>
      {icon && <Icons icon={icon} iconName={iconName} iconColor={iconColor} iconSize={iconSize} iconStyle={[{marginRight: 5},iconStyle]} />}
      {label && <Text style={[T2, labelStyle]}>{label}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: iconSide,
        alignSelf: 'baseline',
        backgroundColor: COLORS.default,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
})