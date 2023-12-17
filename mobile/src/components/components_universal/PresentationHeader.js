import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H3, T2 } from '../../constants/text-style'

export default function PresentationHeader({
    style,
    title,
    showAllButton,
    onPress,
}) {
  return (
        <View style={[styles.headerBar, style]}>
            <Text style={H3}>{title}</Text>
            {showAllButton && <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
                <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Mehr anzeigen</Text>
            </TouchableOpacity>}
        </View>
  )
}

const styles = StyleSheet.create({

    containerStyle: {
        width: width,
    },

    headerBar: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', 
        marginHorizontal: 30,
        marginBottom: 15,
    },

    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    buttonTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        color: COLORS.subPrimary
    }
})