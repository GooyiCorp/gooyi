import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons from './Icons'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

export default function TapButton({
    icon,
    iconName,
    iconColor,
    iconSize,
    iconStyle
}) {

    const [selected, setSelected] = useState(true)

  return (
    <Pressable onPress={() => setSelected(!selected)} style={[styles.button, {backgroundColor: selected? COLORS.grey : COLORS.default}]}>
        <Icons 
            icon={icon}
            iconName={iconName}
            iconColor={selected? COLORS.white : COLORS.grey}
            iconSize={iconSize}
            iconStyle={iconStyle}
        />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        height: 38,
        width: 38,
        backgroundColor: COLORS.default,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})