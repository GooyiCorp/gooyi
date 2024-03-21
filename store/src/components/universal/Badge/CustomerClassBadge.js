import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../helper/constants/colors'
import { T3 } from '../../../helper/constants/text'
import { height } from '../../../helper/constants/size'

export default function CustomerClassBadge({
    type,
    styleContainer
}) {
  return (
    <View 
    style={[
        {
        backgroundColor: COLORS.grey,
        alignSelf: 'flex-start', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: height,
        },
        styleContainer
    ]}
>
    <Text 
        style={[
            T3, 
            {
                color: COLORS.white, 
                fontFamily: 'RH-Medium'
            }
        ]}
    >
        {type}
    </Text>
</View>
  )
}

const styles = StyleSheet.create({})