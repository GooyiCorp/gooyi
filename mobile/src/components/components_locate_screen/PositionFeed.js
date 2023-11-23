import { StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import { T1, T2, T3, T4 } from '../../constants/text-style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PositionFeed({
    street,
    positionInfo,
    onPress,
}) {
  return (
    <TouchableOpacity style={styles.feedContainer} onPress={onPress}>
       
        <View style={styles.iconBox}>
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'map-marker'}
                iconSize={24}
                iconColor={COLORS.grey}
            />
        </View>

        <View style={{height: '100%', width: '75%'}}>
            <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{street}</Text>
            <Text style={[T2, {color: COLORS.grey}]}>{positionInfo}</Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'flex-end', width: '10%'}}>
            <Icons
                icon={icons.Ionicons}
                iconName={'ios-add'}
                iconSize={22}
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