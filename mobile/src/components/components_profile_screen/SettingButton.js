import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../components_universal/Icons'
import Switch from '../components_universal/Switch'
import { COLORS } from '../../index/constantsindex'

export default function SettingButton({
    label,
    onPress,
    switchButton,
    chevron,
    switchState,
    disabled,
    logout,
    labelStyle,
    style
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} disabled={disabled}>

        {/* Label */}
        <View style={{flexDirection: 'row'}}>
            {logout && <Icons
                icon={icons.MaterialIcons}
                iconName={'logout'}
                iconSize={20}
                iconColor={COLORS.grey}
                iconStyle={{
                    marginRight: 10
                }}
            />}
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>

        {/* Chevron */}
        {chevron && <Icons 
            icon={icons.Ionicons}
            iconName={'md-chevron-forward'}
            iconSize={18}
            iconColor={COLORS.grey}
        />}

        {/* Switch */}
        {switchButton && <Switch state={switchState} />}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        //backgroundColor: 'yellow',
    },

    label: {
        fontFamily: 'RH-Medium',
        fontSize: 15,

    }
})