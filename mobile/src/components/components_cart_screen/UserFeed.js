import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { T1, T2 } from '../../constants/text-style'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import { width } from '../../constants/size'

export default function UserFeed() {
  return (
    <TouchableOpacity style={styles.feedContainer}>
       
        <View style={styles.iconBox}>
            <Icons
                icon={icons.Feather}
                iconName={'user'}
                iconSize={21}
                iconColor={COLORS.grey}
            />
        </View>

        <View style={{height: '100%', width: '75%'}}>
            <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>sebastian.122@gmail.com</Text>
            <Text style={[T2, {color: COLORS.grey}]}>277.8796.244</Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'flex-end', width: '10%'}}>
            <Icons
                icon={icons.MaterialIcons}
                iconName={'navigate-next'}
                iconSize={18}
                iconColor={COLORS.grey}
            />
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    feedContainer: {
        width: width-60,
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
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