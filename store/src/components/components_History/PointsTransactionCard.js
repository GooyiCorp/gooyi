import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../helper/constants/colors'
import Icons, { icons } from '../universal/Icons/Icons'
import { T1, T2, T4, T5 } from '../../helper/constants/text'

export default function PointsTransactionCard({
    name,
    transactionID,
    points
}) {
  return (
    <View 
        style={{
            width: '100%',
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.lightGrey,
            paddingVertical: 15,
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
    >
        <View>
            <Text style={[T2, {fontFamily: 'RH-Medium'}]}>{name}</Text>
            <Text style={T4}>{transactionID}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[T2, {fontFamily: 'RH-Regular'}]}>{points}</Text>
            <Icons 
                icon={icons.MaterialIcons}
                iconName={'navigate-next'}
                iconSize={22}
                iconColor={COLORS.grey}
                iconStyle={{
                    marginRight: -8,
                }}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})