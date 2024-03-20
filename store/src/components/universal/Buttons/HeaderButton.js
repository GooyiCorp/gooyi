import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../helper/constants/colors'
import { H5 } from '../../../helper/constants/text'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function HeaderButton({
    title,
    styleContainer,
    styleTitle,
    onPress
}) {
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
    // ---- start - Container
    <Pressable
        style={[
            {
                padding: 5, 
                borderBottomWidth: 0.5, 
                borderColor: COLORS.lightGrey, 
                marginHorizontal: 10
            },
            styleContainer
        ]}
        onPress={onPress}
    >

        {/* ---- start - Title */}
        <Text 
            style={[
                H5,
                styleTitle
            ]}
        >
            {title}
        </Text>
        {/* ---- end - Title */}

    </Pressable>
    // ---- end - Container
)

}