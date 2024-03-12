import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../helper/constants/colors'
import { H1, T1, T2 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'

export default function StatisticBox() {
  return (
    <View 
        style={{
            height: 130,
            width: 200,
            borderWidth: 0.5,
            borderRadius: 16,
            borderColor: COLORS.grey,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginTop: 20
        }}
    >
      <Text style={[T1, {color: COLORS.grey}]}>Aktive Kunden</Text>
      <Text style={H1}>453</Text>
      <View style={{flexDirection: 'row', backgroundColor: COLORS.green, alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 20, position: 'absolute', bottom: 10, left: 10}}>
        <Icons 
            icon={icons.MaterialIcons}
            iconName={'play-arrow'}
            iconSize={15}
            iconColor={COLORS.white}
            iconStyle={{
                transform: [{rotate: '-90deg'}]
            }}
        />
        <Text style={[T2, {fontFamily: 'RH-Bold', color: COLORS.white}]}>20%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})