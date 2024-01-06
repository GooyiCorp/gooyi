import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons from '../../components_universal/Icons'
import { COLORS } from '../../../index/constantsindex'
import { T2 } from '../../../constants/text-style'

export default function CategoryIconButton({
    icon,
    iconName,
    iconColor,
    iconSize,
    iconStyle,
    style,
    onPressButton,
}) {
  return (
    <View>
        <Pressable style={[styles.buttonContainer, style]} onPress={onPressButton} >
            <Icons 
                icon={icon} 
                iconName={iconName} 
                iconColor={iconColor} 
                iconSize={iconSize} 
                iconStyle={iconStyle} 
            />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 34,
        width: 34,
        backgroundColor: COLORS.grey,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
})