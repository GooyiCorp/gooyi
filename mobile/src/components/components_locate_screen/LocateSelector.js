import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'

export default function LocateSelector({
    icon,
    iconName,
    iconColor,
    iconSize,
    style,
    onPress,
    activeOpacity,
}) {
  return (
    <TouchableOpacity 
        style={[styles.container, style]} 
        onPress={onPress}
        activeOpacity={activeOpacity}
    >
        <Icons
            icon={icon}
            iconName={iconName}
            iconSize={iconSize}
            iconColor={iconColor}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: '31%',
        // borderWidth: 0.5,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
})