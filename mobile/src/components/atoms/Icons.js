import React from 'react'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons, SimpleLineIcons, Octicons } from '@expo/vector-icons';

export const icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome, 
    Ionicons, 
    SimpleLineIcons,
    Octicons,
}

export default function Icons({
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