import React from 'react'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

export const icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5, 
    Ionicons, 
}

export default function NavIcons({
    icon,
    iconName,
    iconSize,
    iconColor,
    iconStyle,
}) {
    const Tag = icon;
    return (
        <>
            {icon && (<Tag name={iconName} size={iconSize} color={iconColor} style={iconStyle}/>)}
        </>
    )
}