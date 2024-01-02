import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../../helper/scale.js';
import Icons from './Icons.js'
import { COLORS } from '../../index/constantsindex.js';
import { T1, T3, T4, T5 } from '../../constants/text-style.js';

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
    badges,
    count,
}) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPressButton} activeOpacity={activeOpacity}>
      {badges && <View style={styles.badges}>
        <Text style={[T5, {color: COLORS.white}]}>{count}</Text>
      </View>}
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
    },
    badges: {
      position: 'absolute',
      height: 20,
      width: 20,
      backgroundColor: COLORS.primary,
      zIndex: 2,
      right: -5,
      top: -5,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
})