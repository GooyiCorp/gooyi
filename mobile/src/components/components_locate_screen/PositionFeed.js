import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import { T1, T2, T3, T4 } from '../../constants/text-style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PositionFeed({
    shopName,
    description,
    distance,
}) {
  return (
    <View style={styles.feedContainer}>
        <View style={styles.iconBox}>
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'map-marker'}
                iconSize={24}
                iconColor={COLORS.grey}
            />
        </View>

        <View style={{height: '100%'}}>
            <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]} >Bismarkstraße 45</Text>
            <Text style={[T2, {color: COLORS.grey}]}>22767 Bremen, Deutschland</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    feedContainer: {
        width: width-60,
        // backgroundColor: 'yellow',
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: COLORS.ivoryDark,
        alignItems: 'center',
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