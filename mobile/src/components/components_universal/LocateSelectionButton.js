import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from './Icons'
import { moderateScale } from '../../helper/scale'
import { T1, T4, T5 } from '../../constants/text-style'

export default function LocateSelectionButton({
    label,
    icon,
    iconName,
    iconSize,
    iconColor,
    onPress,
    bgStyle,
    labelStyle,
}) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
        <View style={[styles.button, bgStyle]}>
            <Icons
                icon={icon}
                iconName={iconName}
                iconSize={iconSize}
                iconColor={iconColor}
            />
        </View>
        <Text style={[T5, {color: COLORS.grey}, labelStyle]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({

    button: {
        width: '100%',
        height: 60,
        backgroundColor: COLORS.mainBackground,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },

    iconView: {
        height: 44,
        width: 44,
        // backgroundColor: COLORS.ivoryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: 15,
        // position: 'absolute',
        // left: 5
    },

    buttonContainer: {
        width: '31%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})