import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import { T2, T1, T3 } from '../../constants/text-style'
import { width } from '../../constants/size'

export default function CurrentPositionFeed({
    currentPosition,
    supplement,
    onPress,
}) {
  return (
    <>     

        <Text style={[T3, {color: COLORS.grey, marginBottom: 5}]}>Mein Standort</Text>

        <View style={{width: width-60, paddingVertical: 5, borderRadius: 16, marginBottom: 20}}>

        {/* Current Position Feed  */}
            <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{currentPosition}</Text>
            <Text style={[T2, {color: COLORS.grey}]}>{supplement}</Text>
        
        </View>

    </>
  )
}

const styles = StyleSheet.create({})