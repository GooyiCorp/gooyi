import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../helper/constants/colors'
import Icons, { icons } from '../Icons/Icons'
import { T1 } from '../../../helper/constants/text'

export default function SmallButton({
    leftIcon, leftIconName, leftIconSize, leftIconStyle, leftIconColor,
    label,
    styleContainer, styleLabel,
    onPress,
}) {
  return (
    <TouchableOpacity style={[styles.container, styleContainer]} onPress={onPress}>
        {leftIcon ? <Icons icon={leftIcon} iconName={leftIconName} iconSize={leftIconSize} iconColor={leftIconColor} iconStyle={leftIconStyle} /> : null}
        <Text style={[T1, styleLabel]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.ivoryDark2,
        borderRadius: 12,
    }
})