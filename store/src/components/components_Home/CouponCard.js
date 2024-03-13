import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../helper/constants/colors'
import { T1, T2, T3 } from '../../helper/constants/text'
import StatusBadge from '../universal/Badge/StatusBadge'
import Icons, { icons } from '../universal/Icons/Icons'

export default function CouponCard() {
  return (
    <View 
        style={{
            height: 140,
            width: 250,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            paddingHorizontal: 15,
                    paddingVertical: 10
        }}
    >
        <Text style={[T1, {fontFamily: 'RH-Bold'}]}>20% auf alle vegane Gerichte</Text>
        <Text style={[T3, {marginTop: 5}]}>Cap: 560 / 700</Text>
        <StatusBadge 
            status={'Aktiv'}
            styleContainer={{
                marginTop: 6,
                left: -2,
            }}
        />
        
        <Icons
            icon={icons.MaterialCommunityIcons}
            iconName={'square-edit-outline'}
            iconSize={25}
            iconColor={COLORS.grey}
            iconStyle={{
                position: 'absolute',
                bottom: 10,
                right: 10,
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})