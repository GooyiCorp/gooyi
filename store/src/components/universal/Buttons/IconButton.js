import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons from '../Icons/Icons'
import { COLORS } from '../../../constants/colors'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function IconButton({
    // Style
    styleContainer,
    styleIcon,
    // Icon
    icon,
    iconName,
    iconSize,
    iconColor,
    // Handler
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

    {/* Icon */}
    <Icons
        icon={icon}
        iconName={iconName}
        iconColor={iconColor}
        iconSize={iconSize}
        iconStyle={styleIcon}
    />

</TouchableOpacity>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    container: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.ivoryDark2,
        borderRadius: 22,
    },
    
})