import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Helpers
import { T1 } from '../../../constants/text'
import { COLORS } from '../../../constants/colors'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function BigButton({
    // Style
    styleContainer,
    styleLabel,
    // Value
    label,
    onPress
}) {

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<TouchableOpacity 
    style={[styles.container, styleContainer]}
    onPress={onPress}
>

    {/* Label */}
    <Text style={[T1, styles.label, styleLabel]}>{ label ? label : 'Label'}</Text>

</TouchableOpacity>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },

    label: {
        fontFamily: 'RH-Medium',
        color: COLORS.white,
    },

})