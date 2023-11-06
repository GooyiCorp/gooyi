import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../components_universal/Icons'
import Switch from '../components_universal/Switch'
import { COLORS } from '../../index/constantsindex'
import { T1, T2 } from '../../constants/text-style'

export default function SettingButton({
    label,
    onPress,
    switchButton,
    chevron,
    switchState,
    disabled,
    logout,
    labelStyle,
    style,
    lock,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={lock? null : onPress} disabled={disabled} activeOpacity={lock? 1 : 0.2}>

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
            <Text style={[
                T2, 
                {
                    color: lock? COLORS.borderGrey : COLORS.black
                },
                labelStyle
                ]}>{label}</Text>
        </View>

        {/* Chevron */}
        {chevron && <Icons 
            icon={icons.Ionicons}
            iconName={'md-chevron-forward'}
            iconSize={18}
            iconColor={COLORS.grey}
        />}

        {/* lock */}
        {lock && <Icons 
            icon={icons.Ionicons}
            iconName={'ios-lock-closed'}
            iconSize={18}
            iconColor={COLORS.borderGrey}
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