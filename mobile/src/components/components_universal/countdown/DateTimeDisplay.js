import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { T4 } from '../../../constants/text-style'

export default function DateTimeDisplay({ 
    value,
    type,
    isDanger,
    styleBox,
    styleDigit
}) {
return (
    <View style={[styles.digitBox, styleBox]}>
        <Text style={[styles.defaultDigit, styleDigit]}>{value}</Text>
    </View>
)
}

const styles = StyleSheet.create({
    
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    defaultDigit: {
        fontSize: 16,
        fontFamily: 'RH-Bold'
    },

    digitBox: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.ivory,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }

})