import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../../helper/constants/size'
import { H1 } from '../../../helper/constants/text'
import { COLORS } from '../../../helper/constants/colors'
import Icons, { icons } from '../Icons/Icons'

export default function CalculatorButton({
    num,
    type,
    size,
}) {
  return (
    <TouchableOpacity 
        style={{
            width: width/3-40,
            height: 60,
            margin: 10,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >

        {type == 'num' ? 
            <Text style={[H1, {color: num == '00' ? COLORS.lightGrey : COLORS.grey, fontSize: num == '00' ? 25 : 30}]}>{num}</Text>
        : null}

        {type == 'del' ? 
            <Icons 
                icon={icons.Feather}
                iconName={'delete'}
                iconSize={25}
                iconColor={COLORS.lightGrey}
            />
        : null}

    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({})