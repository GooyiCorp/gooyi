import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { T1, T2 } from '../../constants/text-style'
import Icons, { icons } from '../components_universal/Icons'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function LocateSelector({
    onPress,
    textField1,
    textField2,

    icon,
    iconName,
    iconColor,
    iconSize,
    bgStyleIcon,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
       
    <View style={[styles.iconBox, bgStyleIcon]}>
        <Icons
            icon={icon}
            iconName={iconName}
            iconSize={iconSize}
            iconColor={iconColor}
        />
    </View>

    <View style={{height: '100%', width: '75%'}}>
        <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{textField1}</Text>
        <Text style={[T2, {color: COLORS.grey}]}>{textField2}</Text>
    </View>

    <View style={{justifyContent: 'center', alignItems: 'flex-end', width: '10%'}}>
        <Icons
        />
    </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    container: {
        width: width-60,
        paddingVertical: 10,
        flexDirection: 'row',
        borderColor: COLORS.ivoryDark,
        alignItems: 'center',
        zIndex: 6,
    },

    iconBox: {
        width: 38,
        height: 38,
        borderRadius: 50,
        backgroundColor: COLORS.ivoryDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    }

})